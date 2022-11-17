import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "./contexts/UserContext.js";
import LoginPage from "./pages/LoginPage/index.js";
import RegisterPage from "./pages/RegisterPage/index.js";

function App() {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("UserInfo") || "{}")
  );
  const value = { userInfo, setUserInfo };

  return (
    <>
      <UserContext.Provider value={value}>
        <BrowserRouter>
          <Routes>
            <Route path="/sign-up" element={<RegisterPage />} />
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;

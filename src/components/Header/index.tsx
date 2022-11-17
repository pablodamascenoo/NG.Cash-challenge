import { useNavigate } from "react-router-dom";
import Styles from "./Header.module.css";

export default function Header() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <header className={Styles.header}>
      <p className={Styles.title}>NG.CASH</p>
      <button className={Styles.logout} onClick={handleLogout}>
        logout
      </button>
    </header>
  );
}

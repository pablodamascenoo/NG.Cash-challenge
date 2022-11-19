import Header from "../../components/Header/index.js";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext.js";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import Transactions, {
  Transaction,
} from "../../components/Transactions/index.js";
import Balance from "../../components/Balance/index.js";
import TransactionModal from "../../components/TransactionModal/index.js";

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[] | []>([]);
  const [hidden, setHidden] = useState(true);
  const { userInfo }: any = useContext(UserContext);
  const navigate = useNavigate();

  function changeTransactions(value: Transaction[] | []) {
    setTransactions([...value]);
  }

  function changeModal() {
    setHidden(!hidden);
  }

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  function loadTransactions() {
    if (!userInfo.token) {
      toast.error("Please, sign-in first");
      navigate("/");
    }

    const promisse = api.get("transactions", config);

    promisse.then((obj) => {
      const { data } = obj;
      setTransactions(data);
    });

    promisse.catch((error) => {
      toast(error.response.data);
      navigate("/");
    });
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <main>
      <Toaster />
      <TransactionModal
        config={config}
        hiddenBoll={hidden}
        closeModal={changeModal}
      />
      <Header />
      <Balance
        config={config}
        openModal={changeModal}
        name={userInfo.username}
      />
      <Transactions
        transactions={transactions}
        config={config}
        changeTransactions={changeTransactions}
      />
    </main>
  );
}

import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext.js";
import Styles from "./Transactions.module.css";
import dayjs from "dayjs";
import { SubmitHandler, useForm } from "react-hook-form";
import { TailSpin } from "react-loader-spinner";
import api from "../../services/api.js";
import { toast, Toaster } from "react-hot-toast";

export type Transaction = {
  debitedAccount: {
    User: { username: string };
  };
  creditedAccount: {
    User: { username: string };
  };
  value: number;
  createdAt: string;
};

type Props = {
  transactions: Transaction[] | [];
  config: { headers: { Authorization: string } };
  changeTransactions: (value: [] | Transaction[]) => any;
};

type FormValues = {
  type: string;
  date: string;
};

export default function Transactions({
  transactions,
  config,
  changeTransactions,
}: Props) {
  const { userInfo }: any = useContext(UserContext);
  const { register, handleSubmit } = useForm<FormValues>();
  const [submited, setSubmited] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setSubmited(true);

    const promisse = api.get(
      `transactions/?type=${data.type}&date=${data.date}`,
      config
    );

    promisse.then((obj) => {
      const { data } = obj;
      changeTransactions(data);
      setSubmited(false);
    });

    promisse.catch((error) => {
      toast.error(error.response.data);
      setSubmited(false);
    });
  };

  return (
    <section className={Styles.transactions_card}>
      <Toaster />
      <form
        className={Styles.transactions_form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <select
          className="w-16 xs:w-28 sm:w-44"
          disabled={submited}
          {...register("type")}
          name="type"
          id="type"
        >
          <option value="all">All</option>
          <option value="cash-in">cash-in</option>
          <option value="cash-out">cash-out</option>
        </select>
        <input
          className="w-16 px-5 xs:w-28 sm:w-44 xs:px-0 "
          disabled={submited}
          {...register("date")}
          type="date"
        />
        <button className="w-16 sm:w-44 xs:w-28" disabled={submited}>
          {submited ? <TailSpin width={25} color="white" /> : "Search"}
        </button>
      </form>
      <div className={Styles.transactions_box}>
        {transactions.map((transaction, index) => {
          const usernameCredited = transaction.creditedAccount.User.username;
          const usernameDebited = transaction.debitedAccount.User.username;
          const userCreditedBoll = usernameCredited === userInfo.username;
          const value = (transaction.value / 100).toFixed(2).replace(/\./, ",");
          return (
            <div className={Styles.transaction_row} key={index}>
              <p className="text-center">
                {userCreditedBoll ? usernameDebited : usernameCredited}
              </p>
              <p className="text-center">
                {dayjs(transaction.createdAt).format("D MMM YY")}
              </p>
              <p
                className={
                  userCreditedBoll
                    ? "text-green-600 text-center"
                    : "text-red-600 text-center"
                }
              >
                R$ {value}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import Styles from "./Balance.module.css";
import { Eye, EyeClosed } from "phosphor-react";
import api from "../../services/api.js";

type Props = {
  config: { headers: { Authorization: string } };
  openModal: () => any;
};

export default function Balance({ config, openModal }: Props) {
  const [balance, setBalance] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const promisse = api.get("balance", config);

    promisse.then((obj) => {
      const { data } = obj;
      setValue(data.balance);
    });
  }, []);

  function handleBalance() {
    setBalance(!balance);
  }

  return (
    <section className={Styles.card}>
      <div className={Styles.card_text_row}>
        <p className={Styles.card_text}>Olá, Pablo</p>
        <div className={Styles.balance_row}>
          <p
            className={[
              Styles.card_text,
              !balance ? Styles.grey_bar : null,
            ].join(" ")}
          >
            R$: {(value / 100).toFixed(2).replace(/\./, ",")}
          </p>
          <button className={Styles.card_button} onClick={handleBalance}>
            {balance ? (
              <Eye color="black" size={28} />
            ) : (
              <EyeClosed color="black" size={28} />
            )}
          </button>
        </div>
      </div>
      <button
        onClick={() => {
          openModal();
        }}
      >
        Make Transaction
      </button>
    </section>
  );
}

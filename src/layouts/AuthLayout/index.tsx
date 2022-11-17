import { ReactElement } from "react";
import Styles from "./Layout.module.css";
import Typed from "react-typed";

type Props = {
  children: ReactElement;
};

export default function AuthLayout({ children }: Props) {
  return (
    <main className={Styles.container}>
      <div className={Styles.title_box}>
        <h2 className={Styles.title}>NG.CASH</h2>
        <Typed
          className={Styles.description}
          strings={[
            "A new way of payments for GenZ",
            "Get ready with the NG Cash",
            "It's really easy!",
          ]}
          typeSpeed={40}
          backSpeed={50}
          loop
        />
      </div>
      <div className={Styles.box}>{children}</div>
    </main>
  );
}

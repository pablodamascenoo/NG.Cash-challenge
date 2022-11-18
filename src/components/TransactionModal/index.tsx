import Styles from "./TransactionModal.module.css";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import CurrencyInput from "../CurrencyInput/index.js";
import api from "../../services/api.js";
import toast from "react-hot-toast";
import { X } from "phosphor-react";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

type FormValues = {
  username: string;
  value: string;
};

const schema = Joi.object<FormValues>({
  username: Joi.string().min(3).required(),
  value: Joi.string()
    .pattern(/R\$(\d|\.)+\,\d{2}/)
    .message("please include the decimal digits")
    .required(),
});

type Props = {
  config: { headers: { Authorization: string } };
  hiddenBoll: boolean;
  closeModal: () => any;
};

export default function TransactionModal({
  config,
  hiddenBoll,
  closeModal,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    criteriaMode: "firstError",
    resolver: joiResolver(schema),
  });
  const [submited, setSubmited] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setSubmited(true);
    const { value, username } = data;
    const parsedValue = Number(value.replace(/(R\$|\.|\,)/g, ""));

    const promisse = api.post(
      "/transaction",
      { username, value: parsedValue },
      config
    );

    promisse.then(() => {
      toast.success("success transaction");
      window.location.reload();
      setSubmited(false);
    });

    promisse.catch((error) => {
      toast.error(error.response.data);
      reset();
      setSubmited(false);
    });
  };

  function handleClose() {
    reset();
    closeModal();
  }

  return (
    <div
      className={[Styles.modal, hiddenBoll ? Styles.hide_modal : null].join(
        " "
      )}
    >
      <button
        disabled={submited}
        className={Styles.close}
        onClick={handleClose}
      >
        <X color="black" size={25} />
      </button>
      <form className={Styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">To whom you want to transfer?</label>
        <div className="input_wrapper">
          <input
            placeholder="username"
            style={{ borderColor: errors.username ? "red" : "black" }}
            disabled={submited}
            type="text"
            {...register("username")}
          />
          {errors.username && (
            <p className="error">{errors.username.message}</p>
          )}
        </div>
        <label htmlFor="">How much?</label>
        <Controller
          control={control}
          name="value"
          render={({ field: { onChange, name, value } }) => (
            <div className="input_wrapper">
              <CurrencyInput
                placeholder="R$0,00"
                style={{ borderColor: errors.value ? "red" : "black" }}
                disabled={submited}
                onChange={onChange}
                value={value}
                name={name}
              />
              {errors.value && <p className="error">{errors.value.message}</p>}
            </div>
          )}
        />
        <button disabled={submited}>
          {submited ? <TailSpin width={25} color="white" /> : "submit"}
        </button>
      </form>
    </div>
  );
}

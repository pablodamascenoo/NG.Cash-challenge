import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout/index.js";
import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import api from "../../services/api.js";
import { toast, Toaster } from "react-hot-toast";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";

type FormValues = {
  username: string;
  password: string;
  confirmPassword: string;
};

const schema = Joi.object<FormValues>({
  username: Joi.string()
    .min(3)
    .message("password must have at least 3 characters")
    .required(),
  password: Joi.string()
    .min(8)
    .message("password must have at least 8 characters")
    .pattern(/(?=.*\d)(?=.*[A-Z])/)
    .message("password must have an upercase and a number")
    .required(),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "passwords must match",
    "any.required": "passwords must match",
  }),
});

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    criteriaMode: "firstError",
    resolver: joiResolver(schema),
  });
  const navigate = useNavigate();
  const [submited, setSubmited] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const promisse = api.post("auth/sign-up", {
      ...data,
    });

    promisse
      .then(() => {
        toast.success("Conta criada com sucesso");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  return (
    <AuthLayout>
      <>
        <Toaster />
        <h3 className="auth_title">Register</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input_wrapper">
            <input
              disabled={submited}
              style={{ borderColor: errors.username ? "red" : "black" }}
              {...register("username")}
              placeholder="username"
              type="text"
            />
            {errors.username && (
              <p className="error">{errors.username.message}</p>
            )}
          </div>
          <div className="input_wrapper">
            <input
              disabled={submited}
              style={{ borderColor: errors.password ? "red" : "black" }}
              {...register("password")}
              placeholder="password"
              type="password"
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>
          <div className="input_wrapper">
            <input
              disabled={submited}
              style={{ borderColor: errors.confirmPassword ? "red" : "black" }}
              {...register("confirmPassword")}
              placeholder="confirm password"
              type="password"
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword.message}</p>
            )}
          </div>
          <button disabled={submited}>
            {submited ? <TailSpin width={30} color="white" /> : "sign-up"}
          </button>
        </form>
        <Link to={"/"}>have an account? click here</Link>
      </>
    </AuthLayout>
  );
}

import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout/index.js";
import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import api from "../../services/api.js";
import { toast, Toaster } from "react-hot-toast";
import UserContext from "../../contexts/UserContext.js";
import { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";

type FormValues = {
  username: string;
  password: string;
};

const schema = Joi.object<FormValues>({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export default function LoginPage() {
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
  const { setUserInfo }: any = useContext(UserContext);
  const [submited, setSubmited] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setSubmited(true);

    const promisse = api.post("auth/sign-in", {
      ...data,
    });

    promisse
      .then((obj) => {
        const { data } = obj;
        localStorage.setItem("UserInfo", JSON.stringify({ ...data }));
        setUserInfo({ ...data });
        setSubmited(false);
        navigate("/home");
      })
      .catch((error) => {
        if (!error) return toast.error("server error");
        toast.error(error.response.data);
        setSubmited(false);
      });
  };

  return (
    <AuthLayout>
      <>
        <Toaster />
        <h3 className="auth_title">Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input_wrapper">
            <input
              style={{ borderColor: errors.username ? "red" : "black" }}
              {...register("username")}
              placeholder="username"
              type="text"
              disabled={submited}
            />
            {errors.username && (
              <p className="error">{errors.username.message}</p>
            )}
          </div>
          <div className="input_wrapper">
            <input
              style={{ borderColor: errors.password ? "red" : "black" }}
              {...register("password")}
              placeholder="password"
              type="password"
              disabled={submited}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>
          <button disabled={submited}>
            {submited ? <TailSpin width={30} color="white" /> : "sign-in"}
          </button>
        </form>
        <Link to={"/sign-up"}>new here? create account</Link>
      </>
    </AuthLayout>
  );
}

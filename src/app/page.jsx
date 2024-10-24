"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./globals.css";
import { loginUser } from "./services/auth";
import { useRouter } from "next/navigation";
import useUserStore from "@/zustand/store";
import { toast, ToastContainer } from "react-toastify";
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia";

import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
// Schéma de validation avec Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("L'email est invalide")
    .required("L'email est requis"),
  password: yup
    .string()
    .min(6, "Le mot de passe doit avoir au moins 6 caractères")
    .required("Le mot de passe est requis"),
});

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);

    loginUser(data)
      .then((res) => {
        router.push("/DashboardHome");
        setUser(res.data.userinfos);
        toast.success("Connexion réussie !");
      })
      .catch((err) => {
        toast.error("erreur de Connexion  !");
        setLoading(false);
        console.error(err);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="login">
        <div className="left-login"></div>
        <div className="right-login">
          <h2>
            Bienvenue sur la <br /> plateforme admin
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email :</label>
            <input className="emailput" type="email" {...register("email")} />

            {errors.email && <p className="error">{errors.email.message}</p>}

            <label htmlFor="password">Mot de passe :</label>
            <div className="foreyeinput">
              <input
                className="passput"
                type={!show && "password"}
                {...register("password")}
              />
              <div className="eye">
                {show ? (
                  <LiaEyeSolid
                    style={{ cursor: "pointer" }}
                    onClick={() => setShow(false)}
                    size={25}
                  />
                ) : (
                  <LiaEyeSlashSolid
                    style={{ cursor: "pointer" }}
                    size={25}
                    onClick={() => setShow(true)}
                  />
                )}
              </div>
            </div>

            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}

            <p>Mot de passe oublié ?</p>
            {!loading ? (
              <button type="submit">Connexion</button>
            ) : (
              <button type="submit">
                <CircularProgress size={25} color="white" />
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

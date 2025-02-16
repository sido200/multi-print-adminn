"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Parametre.css";
import { updateUser } from "@/app/services/auth";
import useUserStore from "@/zustand/store";
import Swal from "sweetalert2";

// Validation schema using Yup
const schema = yup.object().shape({
  name: yup.string().required("Nom & prénom est requis"),
  phone: yup
    .string()
    .required("Numéro de téléphone est requis")
    .matches(/^[0-9]+$/, "Doit être un numéro valide"),
  email: yup
    .string()
    .required("Adresse email est requise")
    .email("Email invalide"),
  oldPassword: yup.string().required("Mot de passe actuel est requis"),
  password: yup
    .string()
    .required("Nouveau mot de passe est requis")
    .min(6, "Le mot de passe doit comporter au moins 6 caractères"),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Les mots de passe doivent correspondre"
    )
    .required("Confirmation du mot de passe est requise"),
});

export default function Page() {
  const user = useUserStore((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    updateUser(user._id, data)
      .then((res) => {
        Swal.fire({
          title: "Good job!",
          text: "update User successfully",
          icon: "success",
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  return (
    <div className="dahsboard-parametre">
      <h1>Paramètres</h1>
      <p>Gérer les paramètres de votre compte</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="info-perso">
          <h3>Informations personnelles :</h3>
          <div className="input-container">
            <div className="input">
              <input
                type="text"
                placeholder="Nom & prénom"
                {...register("name")}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div className="input">
              <input
                type="text"
                placeholder="Numéro de téléphone"
                {...register("phone")}
              />
              {errors.phone && <p>{errors.phone.message}</p>}
            </div>

            <div className="input">
              <input
                type="text"
                placeholder="Adresse email"
                {...register("email")}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div className="input">
              <input type="text" placeholder="Rôle" {...register("role")} />
            </div>
          </div>
        </div>

        <div className="info-perso secu">
          <h3>Sécurité :</h3>
          <div className="input">
            <input
              type="password"
              placeholder="Mot de passe actuel"
              {...register("oldPassword")}
            />
            {errors.oldPassword && <p>{errors.oldPassword.message}</p>}
          </div>

          <div className="input">
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              {...register("password")}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <div className="input">
            <input
              type="password"
              placeholder="Confirmer mot de passe"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <button type="submit">Confirmer</button>
      </form>
    </div>
  );
}

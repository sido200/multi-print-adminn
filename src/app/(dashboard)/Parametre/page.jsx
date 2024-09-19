"use client"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Parametre.css";
// Validation schema using Yup
const schema = yup.object().shape({
  fullName: yup.string().required("Nom & prénom est requis"),
  phoneNumber: yup
    .string()
    .required("Numéro de téléphone est requis")
    .matches(/^[0-9]+$/, "Doit être un numéro valide"),
  email: yup
    .string()
    .required("Adresse email est requise")
    .email("Email invalide"),
  currentPassword: yup.string().required("Mot de passe actuel est requis"),
  newPassword: yup
    .string()
    .required("Nouveau mot de passe est requis")
    .min(6, "Le mot de passe doit comporter au moins 6 caractères"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Les mots de passe doivent correspondre")
    .required("Confirmation du mot de passe est requise"),
});
export default function page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };
  return (
    <div className="dahsboard-parametre">
      <h1>Paramètres</h1>
      <p>Gèrer les paramètres de votre compte</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="info-perso">
          <h3>Informations personnelles :</h3>
          <div className="input-container">
           <div className="input">
           <input
              type="text"
              placeholder="Nom & prénom"
              {...register("fullName")}
            />
            {errors.fullName && <p>{errors.fullName.message}</p>}
           </div>

           <div className="input">
           <input
              type="text"
              placeholder="Numéro de téléphone"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
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
          <input
            type="password"
            placeholder="Mot de passe actuel"
            {...register("currentPassword")}
          />
          {errors.currentPassword && <p>{errors.currentPassword.message}</p>}

          <input
            type="password"
            placeholder="Nouveau mot de passe"
            {...register("newPassword")}
          />
          {errors.newPassword && <p>{errors.newPassword.message}</p>}

          <input
            type="password"
            placeholder="Confirmer mot de passe"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit">Confirmer</button>
      </form>
     
    </div>
  );
}

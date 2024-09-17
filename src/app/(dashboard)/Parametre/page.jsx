import "./Parametre.css";
export default function page() {
  return (
    <div className="dahsboard-parametre">
      <h1>Paramètre</h1>
      <p>
      Gère les paramètre de votre compte
      </p>
      <form
        action="
    "
      >
        <div className="info-perso">
          <h3>Information personnelle :</h3>
          <div className="input-container">
            <input type="text" placeholder="Nom & prénom :" />
            <input type="text" placeholder="Numéro de téléphone :"/>
            <input type="text" placeholder="Adresse email :"/>
            <input type="text" placeholder="Rôle :"/>
          </div>
        </div>
        <div className="info-perso secu">
          <h3>Sécurité :</h3>
          <input type="text" placeholder="Mot de passe actuelle"/>

          <input type="text" placeholder="Nouveau mot de passe"/>
          <input type="text" placeholder="confirmer mot de passe"/>
        </div>
      </form>
      <button>Confirmer</button>
    </div>
  );
}

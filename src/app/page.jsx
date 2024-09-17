import './globals.css'

export default function Home() {
  return (
    <div className="login">
      <div className="left-login">
        
      </div>
      <div className="right-login">
         <h2>Bienvenu dans la <br /> plateforme admin</h2>
         <form action="">
          <label htmlFor="">Email :</label>
         <input type="email" />
          <label htmlFor="">Mot de passe : </label>
         <input type="password" />
         <p>Mot de passe oublier ! </p>
         <button>Connexion</button>
         </form>
      </div>
    </div>
  );
}

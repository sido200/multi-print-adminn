"use client"
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './globals.css';
import { loginUser } from './services/auth';
import { useRouter } from 'next/navigation';

// Schéma de validation avec Yup
const schema = yup.object().shape({
  email: yup.string().email("L'email est invalide").required("L'email est requis"),
  password: yup.string().min(6, 'Le mot de passe doit avoir au moins 6 caractères').required("Le mot de passe est requis"),
});

export default function Home() {
  const navigate=useRouter() 

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  
  const onSubmit = (data) => {
    console.log(data);
    
    loginUser(data)
      .then((res) => {
        navigate("/DashboardHome");
        console.log(res);
      
    
      })
      .catch((err) => {
       
       
        console.error(err);
      });
  };



  return (
    <div className="login">
      <div className="left-login">
    
      </div>
      <div className="right-login">
        <h2>Bienvenue sur la <br /> plateforme admin</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email :</label>
          <input type="email" {...register('email')} />
    
          {errors.email && <p className="error">{errors.email.message}</p>}

          <label htmlFor="password">Mot de passe :</label>
          <input type="password" {...register('password')} />
         
          {errors.password && <p className="error">{errors.password.message}</p>}

          <p>Mot de passe oublié ?</p>
          <button type="submit">Connexion</button>
        </form>
      </div>
    </div>
  );
}

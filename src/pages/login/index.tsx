import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface User {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  function handleClickHome() {
    router.push('/dashboard');
  }

  function handleClickSignUp() {
    router.push('/signup');
  }


  async function handleSignIn() {
    try {
      const response = await axios.post<AuthResponse>('/api/signin', { email, password });
      localStorage.setItem('token', response.data.token); // stocker le token d'authentification dans le stockage local
      // rediriger l'utilisateur vers la page d'accueil
      handleClickHome();
    } catch (error) {
      console.error(error);
      // afficher un message d'erreur à l'utilisateur
      alert("invalid email or password");
    }
  }

  return (
  <>
  <div className="container">
    <div className="row">
    <h1 className="display-4">Page de connexion</h1>
    <form onSubmit={handleSignIn} className='needs-validation'>
      <div className='mb-3'>
        <label htmlFor="email" className='form-label'>Adresse email :</label>
        <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} className='form-control' required />
        <div className='invalid-feedback'>
          Veuillez entrer une adresse email valide.
        </div>
      </div>
      <div className='mb-3'>
        <label htmlFor="password" className='form-label'>Mot de passe :</label>
        <input type="password" id="password" value={password} 
        onChange={(event) => setPassword(event.target.value)} 
        className='form-control' required />
        <div className='invalid-feedback'>
          Veuillez entrer un mot de passe.
        </div>
      </div>
      <div className='container'>
        <div className='row'>
      <button type="submit" className='col-4 m-4 btn btn-primary'>Se connecter</button>
      <button type="button" 
      onClick={handleClickSignUp} className='col-4 m-4 btn btn-success'>Creer un Compte</button>
        </div>
      </div>
    </form>
    </div>
  </div>
  </>
  );
}

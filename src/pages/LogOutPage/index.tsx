import { useRouter } from 'next/router';
import Dashboard from '../dashboard';

export default function LogOutPage() {
    const router = useRouter();

    function handleClick() {
      router.push('login');
    }

    function handleSignOut() {
      localStorage.removeItem('token'); // supprimer le token d'authentification du stockage local
      // rediriger l'utilisateur vers la page de connexion, par exemple
      console.log(localStorage);
      handleClick();
    }
    return(
    <div className="container">
        <div className="row">
            <button onClick={handleSignOut} className='btn btn-secondary'>Se déconnecter</button>
        </div>
    </div>
    )
} 
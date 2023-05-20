import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

export const Signup: React.FC = () => {
  const router = useRouter();
  const { setAuthUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');

  const BASE_URL = 'http://localhost:8080';

  const handleSignUp = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, {
        name,
        email,
        password,
      });

      const { token, user } = response.data;
      setAuthUser({ token, user });
      router.push('/login'); // Rediriger vers la page de login après l'inscription réussie
    } catch (error:any) {
      if (error.response) {
        // Erreur renvoyée par le serveur avec un code d'erreur HTTP
        if (error.response.status === 409) {
          setError('Le nom d\'utilisateur est déjà pris. Veuillez en choisir un autre.');
        } else if (error.response.status === 400) {
          setError('Le format du mot de passe n\'est pas suffisamment fiable. Veuillez choisir un mot de passe plus fort.');
        } else {
          setError('Une erreur s\'est produite lors de l\'inscription.');
        }
      } else {
        // Erreur inattendue
        setError('Une erreur s\'est produite lors de l\'inscription.');
      }
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSignUp();
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Inscription</h2>
              {error && <p className="text-danger">{error}</p>}
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Adresse e-mail</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Adresse e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  S'inscrire
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

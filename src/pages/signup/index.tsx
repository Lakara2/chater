import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { AuthContext } from '../api/authContext';
import { signUpUser } from '../api/axi';

export const Signup: React.FC = () => {
  const router = useRouter();
  const { setAuthUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');

  const handleSignUp = async () => {
    try {
      const { token, user } = await signUpUser(name, email, password);
      setAuthUser({ token, user });
      await router.push('/login'); 
      } catch (error: any) {
      if (error.response) {
        if (error.response.status === 409) {
          setError('Le nom d\'utilisateur est déjà pris. Veuillez en choisir un autre.');
        } else if (error.response.status === 400) {
          setError('Le format du mot de passe n\'est pas suffisamment fiable. Veuillez choisir un mot de passe plus fort.');
        } else {
          setError('Une erreur s\'est produite lors de l\'inscription.');
        }
      } else {
        setError('Une erreur s\'est produite lors de l\'inscription.');
      }
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSignUp().then(r => r);
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

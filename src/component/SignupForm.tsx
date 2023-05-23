import { signup } from '@/pages/api/authApi';
import { useState } from 'react';

interface SignupFormProps {
  onSignupSuccess: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignupSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Appel backend pour l'inscription
      await signup(name, email, password);
      onSignupSuccess(); // Appel de la fonction de succès après l'inscription réussie
    } catch (error: any) {
      if (error.response) {
        // Gérer les erreurs renvoyées par le serveur
        if (error.response.status === 409) {
          setError('Le nom d\'utilisateur est déjà pris. Veuillez en choisir un autre.');
        } else if (error.response.status === 400) {
          setError('Le format du mot de passe n\'est pas suffisamment fiable. Veuillez choisir un mot de passe plus fort.');
        } else {
          setError('Une erreur s\'est produite lors de l\'inscription.');
        }
      } else {
        // Gérer les erreurs inattendues
        setError('Une erreur s\'est produite lors de l\'inscription.');
      }
    }
  };

  return (
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
      {error && <p className="text-danger">{error}</p>}
      <button type="submit" className="btn btn-primary">
        S'inscrire
      </button>
    </form>
  );
};

export default SignupForm;

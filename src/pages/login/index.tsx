import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import Link from 'next/link';

const BASE_URL = 'http://localhost:8080'; // Remplacez par l'URL de votre backend

const Login: React.FC = () => {
  const router = useRouter();
  const { setAuthUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, {
        email,
        password,
      });

      const { token, user } = response.data;
      setAuthUser({ token, user });

      router.push('/channel');
    } catch (error) {
      setError('Adresse e-mail ou mot de passe incorrect');
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSignIn();
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Connexion</h2>
              {error && <p className="text-danger">{error}</p>}
              <form onSubmit={handleSubmit} className="mb-4">
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
                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-primary">
                    Se connecter
                  </button>
                  <Link href="/signup">
                    <button type="button" className="btn btn-secondary">
                      S'inscrire
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
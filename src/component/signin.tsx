import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import "../styles/signin.css"
import { signIn } from '@/pages/api/axi';
import { AuthContext } from '@/pages/api/authContext';

const BASE_URL = 'http://localhost:8080';

export default function signin() {

  const router = useRouter();
  const { setAuthUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSignIn = async () => {
    try {
      const { token, user } = await signIn(email, password);
      setAuthUser({ token, user });
  
      await router.push('/channel');
    } catch (error) {
      setError('Adresse e-mail ou mot de passe incorrect');
    }
  };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSignIn().then(() => handleSignIn());
  };
  
  return (
    <>
      <main className="form-signin">
        <form>
          <img className="mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input type="email" className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)} id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} className="form-control" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
          <Link href="/signup">
            <button type="button" className="btn btn-secondary">
              S inscrire
            </button>
          </Link>
          <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
        </form>
      </main>
    </>
  );
}
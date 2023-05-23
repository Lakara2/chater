import React from 'react';
import { useRouter } from 'next/router';

const LogOut = () => {
  const router = useRouter();

  function handleClick() {
    router.push('login').then((r) => r);
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    console.log(localStorage);
    handleClick();
  }

  return (
    <div className="container">
      <div className="row">
        <button onClick={handleSignOut} className="btn btn-secondary">
          Se déconnecter
        </button>
      </div>
    </div>
  );
};

export default LogOut;

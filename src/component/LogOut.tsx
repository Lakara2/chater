import React from 'react';
import { useRouter } from 'next/router';
import Cookies from "js-cookie";


const LogOut = () => {
  const router = useRouter();

  function handleClick() {
    router.push('login').then((r) => r);
  }


  const handleSignOut = async () => {
    Cookies.remove("jwt");
    await router.push("/login");
    handleClick();
  }

  return (
    <div className="container">
      <div className="row">
        <button onClick={handleSignOut} className="btn btn-danger">
          Se déconnecter
        </button>
      </div>
    </div>
  );
};

export default LogOut;

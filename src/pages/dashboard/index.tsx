import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

type User = {
  email: string;
  password: string;
};

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  
  function handleClick() {
    router.push('/login');
  }

  const setLocalStorageUser = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const getLocalStorageUser = (): User | null => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  };

  useEffect(() => {
    const storedUser = getLocalStorageUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Dashboard</h1>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Welcome {user?.email}</h5>
              <p className="card-text">You are now logged in!</p>
              <button
                className="btn btn-danger"
                onClick={() => {
                  localStorage.removeItem("user");
                  setUser(null);
                  handleClick();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

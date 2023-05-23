import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const createAuthorizedRequest = (accessToken: string) => {
  const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return instance;
};

type User = {
  id: number;
  name: string;
  email: string;
  bio?: string;
  token: string;
  status: boolean;
};

type AuthUser = {
  user: User | null;
  token: string | null;
};

type AuthContextProps = {
  authUser: AuthUser;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUser>>;
  user: User | null;
};

export const AuthContext = createContext<AuthContextProps>({
  authUser: { user: null, token: null },
  setAuthUser: () => {},
  user: null,
});

type AuthProviderProps = {
  children: React.ReactNode;
};


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authUser, setAuthUser] = useState<AuthUser>({ user: null, token: null });

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà authentifié
    const checkAuth = async () => {
      try {
        const response = await axios.get<User>('/user');
        const user = response.data;
        setAuthUser({ user, token: localStorage.getItem('token') });
      } catch (error) {
        // L'utilisateur n'est pas authentifié
        setAuthUser({ user: null, token: null });
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, user : null }}>
      {children}
    </AuthContext.Provider>
  );
};
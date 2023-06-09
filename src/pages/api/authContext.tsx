/** import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';
import { AuthContextProps, AuthProviderProps, AuthUser, UserData } from '../../../utils/types';

export const createAuthorizedRequest = (accessToken: string) => {
  return axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const AuthContext = createContext<AuthContextProps>({
  authUser: { user: null, token: null },
  setAuthUser: () => {},
  user: null,
});


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authUser, setAuthUser] = useState<AuthUser>({ user: null, token: null });

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà authentifié
    const checkAuth = async () => {
      try {
        const response = await axios.get<UserData>('/user');
        const user = response.data;
        setAuthUser({ user, token: localStorage.getItem('token') });
      } catch (error) {
        // L'utilisateur n'est pas authentifié
        setAuthUser({ user: null, token: null });
      }
    };

    checkAuth().then(r => r);
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, user : null }}>
      {children}
    </AuthContext.Provider>
  );
}; */

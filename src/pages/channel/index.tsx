import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import LogOut from '../LogOut';
import Profile from '../Profile';
import { useRouter } from 'next/router';
import DiscussionPage from '../component/DiscussionPage';

const BASE_URL = 'http://localhost:8080'; // Remplacez par l'URL de votre backend

const Channel: React.FC = () => {
  const { setAuthUser } = useContext(AuthContext);
  const [channels, setChannels] = useState<string[]>([]);

  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/channel`);
      const { channels } = response.data;
      setChannels(channels);
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des channels', error);
    }
  };
  const router = useRouter();

  const handleCreateChannel = () => {
    router.push('/createchannel');
  };

  return (
    <div className="container mt-5">
      <h2>Liste des channels</h2>
        <Profile />
      {channels.length === 0 ? (
        <p>Aucun channel disponible</p>
      ) : (
        <ul className="channel-list">
          {channels.map((channel) => (
            <li key={channel}>{channel}</li>
          ))}
        </ul>
      )}
      <div className="container">
        <div className="row">
          <DiscussionPage/>
          <LogOut/>
          <button className="btn btn-primary mt-4" onClick={handleCreateChannel}>Créer un channel</button>
        </div>
      </div>
    </div>
  );
};

export default Channel;

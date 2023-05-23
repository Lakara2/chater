import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { fetchChannels } from '@/pages/api/axi';
import { AuthContext } from '@/pages/api/authContext';

const ChannelComponent: React.FC = () => {
  const { setAuthUser } = useContext(AuthContext);
  const [channels, setChannels] = useState<string[]>([]);

  useEffect(() => {
    loadChannels();
  }, []);

  const loadChannels = async () => {
    try {
      const fetchedChannels = await fetchChannels();
      setChannels(fetchedChannels);
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
      {/* Autres éléments JSX */}
    </div>
  );
};

export default ChannelComponent;

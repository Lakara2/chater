import { GetServerSideProps } from 'next';
import { ChannelData } from '../../../utils/types';
import { useState, useEffect } from 'react';
import LogOut from '@/component/LogOut';
import { useRouter } from 'next/router';
import { fetchChannels } from '../api/axi';
import Cookies from 'js-cookie';

const Channel = ({ channelData }: { channelData: ChannelData[] }) => {
  const router = useRouter();
  const [channels, setChannels] = useState<ChannelData[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (channelData) {
      setChannels(channelData);
    }
  }, [channelData]);

  const handleCreateChannel = () => {
    router.push('/createchannel');
  };

  return (
    <div className="container">
      <div className="card profile-card">
        <div className="card-body">
          <h1 className="card-title">Channel</h1>
          <div className="container mt-5">
            <h2>Liste des channels</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!channels || channels.length === 0 ? (
              <p>Aucun channel disponible</p>
            ) : (
              <ul className="channel-list">
                {channels.map((channel) => (
                  <li key={channel.id}>{channel.name}</li>
                ))}
              </ul>
            )}
          </div>
          <button className="btn btn-primary mt-4" onClick={handleCreateChannel}>
            Créer un channel
          </button>
          <LogOut />
        </div>
      </div>
    </div>
  );
};

export default Channel;
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const token = Cookies.get('token');
    if (!token) {
      throw new Error('User token is not available.');
    }

    const channelData = await fetchChannels(token);
    return {
      props: { channelData },
    };
  } catch (error) {
    return {
      props: { channelData: null },
    };
  }
};

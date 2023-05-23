import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import CreateChannelForm from './CreateChannelForm';
import { AuthContext } from '@/pages/api/authContext';
import Profile from './Profile';
import { createChannel } from '@/pages/api/axi';

const CreateChannel: React.FC = () => {
  const { authUser } = useContext(AuthContext);
  const [channelName, setChannelName] = useState('');
  const [channelType, setChannelType] = useState('');
  const [members, setMembers] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const token = authUser.user?.token;
    console.log(token);
  
    try {
      const newChannel = {
        name: channelName,
        type: channelType,
        members: members.split(',').map((member) => member.trim())
      };
  
      const channelId = await createChannel(newChannel, token);
  
      setChannelName('');
      setChannelType('');
      setMembers('');
      setError('');
  
      await router.push(`/usermessage/${channelId}`);
    } catch (error:any) {
      setError(error.message);
    }
  };
  

  return (
    <div className="container mt-4">
      <div className="row">
        <h1>Create Channel</h1>
        <Profile />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <CreateChannelForm
          channelName={channelName}
          channelType={channelType}
          members={members}
          error={error}
          setChannelName={setChannelName}
          setChannelType={setChannelType}
          setMembers={setMembers}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateChannel;

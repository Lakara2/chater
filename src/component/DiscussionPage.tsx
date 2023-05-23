import React, { useState, useContext } from 'react';
import MessageDisplay from './MessageDisplay';
import MessageInput from './MessageInput';
import { AuthContext } from '@/pages/api/context/authContext';

const DiscussionPage: React.FC = () => {
  const { authUser } = useContext(AuthContext);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (authUser.user) {
      if (newMessage.trim() !== '') {
        setMessages([...messages, newMessage]);
        setNewMessage('');
      }
    } else {
      console.log("Vous devez vous connecter pour envoyer un message.");
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Page de discussion</h1>
      <MessageDisplay messages={messages} />
      <MessageInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        sendMessage={sendMessage}
        disabled={!authUser.user}
      />
    </div>
  );
};

export default DiscussionPage;

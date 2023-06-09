import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { fetchUserMessages, postMessage } from '../api/axi';
import MessageList from '@/component/MessageList';
import MessageForm from '@/component/MessageForm';
import { Profile } from '@/component/ProfileComponent';
import { AuthContext } from '../api/authContext';

const UserMessages: React.FC = () => {
  const router = useRouter();
  const { user_id } = router.query;
  const [messages, setMessages] = useState([]);
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await fetchUserMessages(user_id);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    if (user_id) {
      fetchMessages();
    }
  }, [user_id]);

  const handleSendMessage = async (messageContent: string) => {
    try {
      if (authUser.user) {
        await postMessage(authUser.user.id.toString(), messageContent);
        const updatedMessages = await fetchUserMessages(authUser.user.id.toString());
        setMessages(updatedMessages);
      } else {
        console.error('User is not authenticated');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await fetchUserMessages(user_id);
        console.log('Fetched messages:', fetchedMessages);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    if (user_id) {
      fetchMessages();
    }
  }, [user_id]);

  return (
    <div>
      <h1>User Messages</h1>
      <Profile />
      <MessageList messages={messages} />
      <MessageForm onSendMessage={handleSendMessage} />
    </div>
  );
};

export default UserMessages;

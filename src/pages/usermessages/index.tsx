import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchUserMessages } from '../api/axi';
import MessageList from '@/component/MessageList';

const UserMessages: React.FC = () => {
  const router = useRouter();
  const { user_id } = router.query;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messages = await fetchUserMessages(user_id);
        setMessages(messages);
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
      <MessageList messages={messages} />
    </div>
  );
};

export default UserMessages;

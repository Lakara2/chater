import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import usermessages from '@/pages/usermessages';
import { fetchChannelMessages } from '@/pages/api/axi';

const ChannelMessageComponent: React.FC = () => {
  const router = useRouter();
  const { channel_id } = router.query;

  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const fetchedMessages = await fetchChannelMessages(channel_id as string);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Erreur lors de la récupération des messages :', error);
      }
    };

    if (channel_id) {
      loadMessages().then(() => usermessages);
    }
  }, [channel_id]);

  return (
    <div>
      <h1>Channel Messages</h1>
      {messages.map((message) => (
        <div key={message.id}>
          <p>Sender: {message.sender}</p>
          <p>Date: {message.date}</p>
          <p>Time: {message.time}</p>
          <p>Content: {message.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ChannelMessageComponent;

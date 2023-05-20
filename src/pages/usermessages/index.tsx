// UserMessages.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const UserMessages: React.FC = () => {
  const router = useRouter();
  const { user_id } = router.query;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/messages/user/${user_id}`);
        const messages = response.data;
        setMessages(messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [user_id]);

  return (
    <div>
      <h1>User Messages</h1>
      {messages.map((message:any) => (
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

export default UserMessages;

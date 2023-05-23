import React from 'react';

const MessageList: React.FC<{ messages: any[] }> = ({ messages }) => {
  return (
    <div>
      {messages.map((message: any) => (
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

export default MessageList;

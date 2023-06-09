import React from 'react';

type MessageListProps = {
  messages: { content: string; timestamp: number; viewed: boolean }[];
};

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <ul className="message-list">
      {messages.map((message, index) => (
        <li key={index} className={`message-item${message.viewed ? ' viewed' : ''}`}>
          <span className="message-content">{message.content}</span>
          <span className="message-time">
            {new Date(message.timestamp).toLocaleString()}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default MessageList;

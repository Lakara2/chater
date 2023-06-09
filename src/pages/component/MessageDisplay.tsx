import React from 'react';
import { MessageDisplayProps } from '../../../utils/types';

const MessageDisplay: React.FC<MessageDisplayProps> = ({ messages }) => {
  return (
    <ul className="list-group">
      {messages.map((message, index) => (
        <li key={index} className="list-group-item">
          {message}
        </li>
      ))}
    </ul>
  );
};

export default MessageDisplay;

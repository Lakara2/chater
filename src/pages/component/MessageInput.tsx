import React, { ChangeEvent, FormEvent } from 'react';
import { MessageInputProps } from '../../../utils/types';

const MessageInput: React.FC<MessageInputProps> = ({
  newMessage,
  setNewMessage,
  sendMessage,
  disabled,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      sendMessage();
    }
  };

  return (
    <div>
      <input
        type="text"
        className="form-control me-2"
        placeholder="Entrez votre message"
        value={newMessage}
        onChange={handleChange}
        disabled={disabled}
      />
      <button type="submit" className="btn btn-primary"
       onClick={sendMessage} disabled={disabled}>
        Envoyer
      </button>
    </div>
  );
};

export default MessageInput;

import React, { ChangeEvent} from 'react';

type MessageInputProps = {
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
  disabled: boolean;
};

const MessageInput: React.FC<MessageInputProps> = ({
  newMessage,
  setNewMessage,
  sendMessage,
  disabled,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
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

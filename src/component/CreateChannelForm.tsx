import React from 'react';
import { Form, Button } from 'react-bootstrap';

interface CreateChannelFormProps {
  channelName: string;
  channelType: string;
  members: string;
  error: string;
  setChannelName: (value: string) => void;
  setChannelType: (value: string) => void;
  setMembers: (value: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
}

const CreateChannelForm: React.FC<CreateChannelFormProps> = ({
  channelName,
  channelType,
  members,
  error,
  setChannelName,
  setChannelType,
  setMembers,
  handleSubmit
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-4' controlId='formChannelName'>
        <Form.Label>Channel Name</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter channel name'
          value={channelName}
          onChange={(event) => setChannelName(event.target.value)}
        />
      </Form.Group>

      <Form.Group className='mb-4' controlId='formChannelType'>
        <Form.Label>Channel Type</Form.Label>
        <Form.Control
          as='select'
          value={channelType}
          onChange={(event) => setChannelType(event.target.value)}
        >
          <option value=''>Select channel type</option>
          <option value='public'>Public</option>
          <option value='private'>Private</option>
        </Form.Control>
      </Form.Group>

      <Form.Group className='mb-4' controlId='formMembers'>
        <Form.Label>Members</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter members (comma-separated)'
          value={members}
          onChange={(event) => setMembers(event.target.value)}
        />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Create Channel
      </Button>
    </Form>
  );
};

export default CreateChannelForm;

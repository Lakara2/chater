import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { newChannel, Channel } from '../../../utils/types';
import { GetServerSideProps } from 'next';
import { getChannelData } from '@/api/api';
import { createChannel } from '../api/axi';
import Cookies from 'js-cookie';

const CreateChannel: React.FC = () => {
  const [channelName, setChannelName] = useState('');
  const [channelType, setChannelType] = useState('');
  const [members, setMembers] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const token = Cookies.get('token');

    if (!token) {
      setError('No token found. Please log in.');
      return;
    }

    try {
      const newChannelData: newChannel = {
        name: channelName,
        type: channelType,
        members: members,
      };

      const createdChannel: Channel = await createChannel(newChannelData, token);

      setChannelName('');
      setChannelType('');
      setMembers('');
      setError('');

      await router.push(`/usermessages/${createdChannel.id}`);
    } catch (error) {
      setError('An error occurred while creating the channel.');
    }
  };

  return (
    <div className='container mt-4'>
      <div className='row'>
        <h1>Create Channel</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
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
      </div>
    </div>
  );
};

export default CreateChannel;
export const getServerSideProps: GetServerSideProps = getChannelData;

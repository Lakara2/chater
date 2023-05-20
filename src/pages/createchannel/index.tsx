import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AuthContext } from '@/pages/api/context/authContext';
import Profile from '../Profile';

const CreateChannel: React.FC = () => {
  const { authUser } = useContext(AuthContext);
  const [channelName, setChannelName] = useState('');
  const [channelType, setChannelType] = useState('');
  const [members, setMembers] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const token = authUser.user?.token;
    console.log(token);
    
    try {
      const newChannel = {
        name: channelName,
        type: channelType,
        members: members.split(',').map(member => member.trim())
      };

      const response = await axios.post('http://localhost:8080/channel', newChannel, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setChannelName('');
      setChannelType('');
      setMembers('');
      setError('');

      const channelId = response.data.id;
      await router.push(`/usermessage/${channelId}`);
    } catch (error) {
      setError('Une erreur s\'est produite lors de la création du channel.');
    }
  };
  

  return (
    <div className='container mt-4'>
      <div className='row'>
        <h1>Create Channel</h1>
        <Profile />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-4' controlId="formChannelName">
            <Form.Label>Channel Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter channel name"
              value={channelName}
              onChange={(event) => setChannelName(event.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-4' controlId="formChannelType">
            <Form.Label>Channel Type</Form.Label>
            <Form.Control
              as="select"
              value={channelType}
              onChange={(event) => setChannelType(event.target.value)}
            >
              <option value="">Select channel type</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className='mb-4' controlId="formMembers">
            <Form.Label>Members</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter members (comma-separated)"
              value={members}
              onChange={(event) => setMembers(event.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create Channel
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateChannel;

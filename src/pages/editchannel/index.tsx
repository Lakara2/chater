import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import usermessages from "@/pages/usermessages";
import { fetchChannel, updateChannel } from '../api/axi';

const EditChannel: React.FC = () => {
  const router = useRouter();
  const { channel_id } = router.query;

  const [channelName, setChannelName] = useState('');
  const [channelType, setChannelType] = useState('');

  const resetForm = () => {
    setChannelName('');
    setChannelType('');
  };
  
  const redirectToChatPage = async () => {
    await router.push(`/channel/${channel_id}`);
  };
  
  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const channel = await fetchChannel(channel_id);
        setChannelName(channel.name);
        setChannelType(channel.type);
      } catch (error) {
        console.error('Error fetching channel:', error);
      }
    };

    fetchChannelData().then(() => usermessages);
  }, [channel_id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const updatedChannel = {
        name: channelName,
        type: channelType
      };

      await updateChannel(channel_id, updatedChannel);

      resetForm();
      await redirectToChatPage();
    } catch (error) {
      console.error('Error updating channel:', error);
    }
  };

  return (
    <div>
      <h1>Edit Channel {channel_id}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formChannelName">
          <Form.Label>Channel Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter channel name"
            value={channelName}
            onChange={(event) => setChannelName(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formChannelType">
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

        <Button variant="primary" type="submit">
          Update Channel
        </Button>
      </Form>
    </div>
  );
};

export default EditChannel;



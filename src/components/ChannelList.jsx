// src/components/ChannelList.jsx
// import React from 'react';
import { useFetchChannels } from '../hooks/useFetchChannels';

function ChannelList() {
  const { channels, loading, error } = useFetchChannels();

  if (loading) return <p>Loading channels...</p>;
  if (error) return <p>Error loading channels!</p>;

  return (
    <div>
      <h2>Channels</h2>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id}>{channel.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ChannelList;

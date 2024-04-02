// src/hooks/useChannels.js
import { useContext } from 'react';
import { ChannelsContext } from '../context/ChannelsContext';

export const useChannels = () => {
  const context = useContext(ChannelsContext);
  if (context === undefined) {
    throw new Error('useChannels must be used within a ChannelsProvider');
  }
  return context;
};

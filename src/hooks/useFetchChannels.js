// src/hooks/useFetchChannels.js
import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

export function useFetchChannels() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannels = async () => {
      setLoading(true);
      try {
        const data = await apiService.getChannels();
        // console.log("data_ChannelsAPI: ", data);
        setChannels(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, []);

  return { channels, loading, error };
}
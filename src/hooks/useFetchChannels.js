// src/hooks/useFetchChannels.js
import { useEffect, useState } from 'react';
import { apiService } from '../services/apiService';

export const useFetchChannels = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannels = async () => {
      setLoading(true);
      try {
        const response = await apiService.fetchChannels();
        setChannels(response.data);
        setError(null);
      } catch (err) {
        setError(err);
        setChannels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, []);

  return { channels, loading, error };
};

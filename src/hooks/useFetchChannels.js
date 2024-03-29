// src/hooks/useFetchChannels.js
import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

function useFetchChannels() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannels = async () => {
      setLoading(true);
      try {
        const data = await apiService.getChannels();
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

export default useFetchChannels;

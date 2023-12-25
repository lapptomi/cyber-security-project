import { useEffect, useState } from 'react';
import axios from 'axios';
import { REACT_APP_API_URL } from '../constants';
import { User } from '../types';
import { getToken } from '../helpers';

const useGetLoggedUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${REACT_APP_API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((response) => setUser(response.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
};

export default useGetLoggedUser;

import { useEffect, useState } from 'react';
import axios from 'axios';
import { REACT_APP_API_URL } from '../constants';
import { User } from '../types';

const useGetAllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${REACT_APP_API_URL}/users`)
      .then(({ status, data }) => {
        if (status === 200 && data.length > 0) {
          setUsers(data);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return { users, loading };
};

export default useGetAllUsers;

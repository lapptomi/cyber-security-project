import { useEffect, useState } from "react";
import axios from 'axios';
import { REACT_APP_API_URL } from "../constants";

const useGetLoggedUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');  
    if (!token) return;

    axios.get(`${REACT_APP_API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      const user = response.data;
      if (response.status === 200 && user) {
        setUser(user);
      }
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }, []);

  return { user, loading };
};

export default useGetLoggedUser;
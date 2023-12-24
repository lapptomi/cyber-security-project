import axios from 'axios';
import { REACT_APP_API_URL } from '../src/constants';
import { Credentials } from './types';

export const login = async (credentials: Credentials): Promise<void> => {
  return axios.post(`${REACT_APP_API_URL}/auth/login`, credentials)
    .then((response) => {
      const { token } = response.data;
      if (token) {
        window.localStorage.setItem('token', token);
        window.location.replace('/');
      }
    });
};

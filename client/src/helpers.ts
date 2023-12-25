import axios from 'axios';
import { REACT_APP_API_URL, REACT_APP_TOKEN_KEY } from '../src/constants';
import { Credentials } from './types';

export const login = async (credentials: Credentials): Promise<void> => {
  return axios.post(`${REACT_APP_API_URL}/auth/login`, credentials)
    .then((response) => {
      const { token } = response.data;
      if (token) {
        window.localStorage.setItem(REACT_APP_TOKEN_KEY, token);
        window.location.replace('/');
      }
    });
};

export const getToken = (): string | null => {
  return window.localStorage.getItem(REACT_APP_TOKEN_KEY);
};

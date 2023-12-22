import axios from "axios";
import { REACT_APP_API_URL } from "../src/constants";
import { Credentials, User } from "./types";

export const login = async (credentials: Credentials): Promise<void> => {
  return axios.post(`${REACT_APP_API_URL}/auth/login`, credentials)
    .then((response) => {
      const token = response.data.token;
      if (token) {
        window.localStorage.setItem('token', token);
        window.location.replace('/');
      }
    });
    
};

export const logout = () => {
  window.localStorage.removeItem('token');
  window.location.replace('/');
};

export const createUser = async (credentials: Credentials): Promise<User> => {
  const response = await axios.post(`${REACT_APP_API_URL}/users`, credentials);
  return response.data;
};
import axios from 'axios';
import { AuthService } from './AuthService';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const authService = AuthService(client);

import { AxiosInstance } from 'axios';

export const AuthService = (client: AxiosInstance) => {
  const login = (username: string, password: string) =>
    client.post('/auth/login', new URLSearchParams({ username, password }));

  const register = (email: string, password: string) =>
    client.post('/auth/register', { email, password });

  return {
    login,
    register,
  };
};

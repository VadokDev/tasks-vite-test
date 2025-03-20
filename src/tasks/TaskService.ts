import { Task } from '@/lib/types';
import { AxiosInstance } from 'axios';

export const TaskService = (client: AxiosInstance) => {
  const getTasks = () => client.get('/tasks');

  const createTask = (task: Task) =>
    client
      .post('/tasks', task)
      .then(({ data }) => ({ data: { ...data, _id: data.id } }));

  const updateTask = (id: string, task: Task) =>
    client.put(`/tasks/${id}`, task);

  const deleteTask = (id: string) => client.delete(`/tasks/${id}`);

  return {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};

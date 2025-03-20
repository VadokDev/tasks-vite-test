import { Task } from '@/lib/types';
import { createContext, useContext } from 'react';

interface TaskContextProps {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

const baseContext = {
  tasks: [],
  addTask: () => {},
  toggleTask: () => {},
  deleteTask: () => {},
};

const TaskContext = createContext<TaskContextProps>(baseContext);

const useTask = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }

  return context;
};

export { useTask, TaskContext };

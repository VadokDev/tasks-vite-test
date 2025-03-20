import { useState, ReactNode, useEffect } from "react";
import { TaskContext } from "./TaskContext";
import { Task } from "@/lib/types";
import { taskService } from ".";

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    taskService.createTask(task).then(({ data }) => setTasks((prevTasks) => [...prevTasks, data]));
  };

  const toggleTask = (id: string) => {
    const oldTask = tasks.find((task) => task._id === id)

    if (!oldTask) {
      throw new Error("Task not found");
    };

    const updatedTask: Task = { ...oldTask, status: oldTask?.status === "Pending" ? "Done" : "Pending" }

    taskService.updateTask(id, updatedTask).then(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, status: task.status === "Pending" ? "Done" : "Pending" } : task
        )
      );
    }
    );
  };

  const deleteTask = (id: string) => {
    taskService.deleteTask(id).then(() => setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id)));
  };

  useEffect(() => {
    taskService.getTasks().then((response) => setTasks(response.data));
  }, [])

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>{children}</TaskContext.Provider>
  );
};
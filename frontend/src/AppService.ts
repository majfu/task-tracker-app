import axios from "axios";
import type { Task } from "./model/Task";
import type { CreateTask } from "./model/CreateTask";

const TASKS_API_URL = "http://localhost:8000/api/tasks";

export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get<Task[]>(TASKS_API_URL);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createTask = async (task: CreateTask): Promise<boolean> => {
  try {
    const response = await axios.post(TASKS_API_URL, {
      title: task.title,
      description: task.description,
      due_date: task.due_date?.toISOString(),
      effort_estimate: task.effort_estimate,
    });

    return response.status === 200 || response.status === 201;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteTask = async (id: string): Promise<boolean> => {
  try {
    const response = await axios.delete(`${TASKS_API_URL}/${id}`);
    return response.status === 200 || response.status === 201;
  } catch (error) {
    return false;
  }
};

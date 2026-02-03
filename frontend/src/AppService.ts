import axios from "axios";
import type { TaskGroup } from "./model/TaskGroup";

export const getTaskGroups = async (): Promise<TaskGroup[]> => {
  const response = await axios.get<TaskGroup[]>(
    "http://localhost:8000/api/task-group/all",
  );
  return response.data;
};

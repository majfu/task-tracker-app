import { useEffect, useState } from "react";
import "./App.css";
import type { Task } from "./model/Task";
import { getAllTasks } from "./AppService";
import GroupsList from "./components/TasksList";
import CreateTaskDialog from "./components/CreateTaskDialog";

function App() {
  const [tasksList, setTasksList] = useState<Task[]>([]);

  const refreshTasks = async () => {
    const tasks = await getAllTasks();
    setTasksList(tasks);
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  return (
    <div className="flex flex-col p-20 items-center">
      <div className="text-8xl font-extrabold mb-40 font-mono text-emerald-900">
        Tasks:
      </div>

      <CreateTaskDialog onTaskCreated={refreshTasks}></CreateTaskDialog>

      {tasksList.length != 0 && (
        <GroupsList tasksList={tasksList} onTaskDeleted={refreshTasks} />
      )}
    </div>
  );
}

export default App;

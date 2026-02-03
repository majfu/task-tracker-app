import { useEffect, useState } from "react";
import "./App.css";
import type { TaskGroup } from "./model/TaskGroup";
import { getTaskGroups } from "./AppService";
import GroupsList from "./components/GroupsList";

function App() {
  const [taskGroupsList, setTaskGroups] = useState<TaskGroup[]>([]);

  useEffect(() => {
    getTaskGroups().then((taskGroups) => setTaskGroups(taskGroups));
  });

  return (
    <div className="flex flex-col p-20 items-center">
      <div className="text-8xl font-extrabold mb-40 font-mono text-emerald-900">
        Task Groups:
      </div>
      {taskGroupsList.length != 0 && <GroupsList groupsList={taskGroupsList} />}
    </div>
  );
}

export default App;

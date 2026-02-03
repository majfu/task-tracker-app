import type { Task } from "../model/Task";
import { deleteTask } from "../AppService";

interface TasksListProps {
  tasksList: Task[];
  onTaskDeleted: () => void;
}

function GroupsList({ tasksList, onTaskDeleted }: TasksListProps) {
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const success = await deleteTask(id);
      if (success) {
        onTaskDeleted();
      } else {
        alert("Failed to delete task.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-20">
      {tasksList.map((task) => (
        <div key={task.id}>
          <div className="bg-emerald-50 p-10 mb-5 text-emerald-950 border-3 rounded-2xl border-emerald-950">
            <div className="font-mono text-6xl mb-5">{task.title}</div>

            {task.effort_estimate ? (
              <div className="font-mono text-3xl text-emerald-800 mb-3">
                <span className="font-bold">Effort:</span>{" "}
                {task.effort_estimate} hrs
              </div>
            ) : null}

            <div className="font-mono text-3xl text-emerald-800 mb-5">
              <span className="font-bold">Due:</span>{" "}
              {new Date(task.due_date).toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>

            <div className="font-mono text-4xl">{task.description ?? ""}</div>
          </div>

          <div
            className="font-mono text-2xl hover:cursor-pointer hover:text-pink-700 transition-colors inline-block"
            onClick={() => handleDelete(task.id.toString())}
          >
            Delete
          </div>
        </div>
      ))}
    </div>
  );
}

export default GroupsList;

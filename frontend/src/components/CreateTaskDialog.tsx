import { useState } from "react";
import { createTask } from "../AppService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { CreateTask } from "../model/CreateTask";

interface CreateTaskDialogProps {
  onTaskCreated?: () => void;
}

function CreateTaskDialog({ onTaskCreated }: CreateTaskDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date | null>(new Date());
  const [effortEstimate, setEffortEstimate] = useState<number>(0);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const taskData: CreateTask = {
      title: title,
      description: description || "",
      due_date: dueDate || new Date(),
      effort_estimate: Number(effortEstimate) || 0,
    };
    const success = await createTask(taskData);

    if (success) {
      setIsOpen(false);
      setTitle("");
      setDescription("");
      setDueDate(new Date());
      setEffortEstimate(0);
      onTaskCreated?.();
    } else {
      alert("Failed to create task.");
    }
  };

  return (
    <>
      <button
        className="text-5xl font-semibold mb-30 font-mono text-emerald-900 bg-fuchsia-100 hover:bg-fuchsia-200 hover:cursor-pointer p-5 border-3 rounded-2xl border-emerald-950"
        onClick={() => setIsOpen(true)}
      >
        + New Task
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-pink-50/80 flex justify-center items-center z-50">
          <div className="bg-emerald-50 p-10 rounded-3xl shadow-lg w-full max-w-lg">
            <h2 className="font-mono text-5xl mb-5 text-emerald-950">
              Create Task
            </h2>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <input
                className="p-4 rounded-xl border-2 border-emerald-950 font-mono text-2xl"
                placeholder="Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                className="p-4 rounded-xl border-2 border-emerald-950 font-mono text-2xl"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <DatePicker
                selected={dueDate}
                onChange={(date: Date | null) => setDueDate(date)}
                showTimeSelect
                dateFormat="Pp"
                className="p-4 rounded-xl border-2 border-emerald-950 font-mono text-2xl"
              />

              <input
                type="number"
                className="p-4 rounded-xl border-2 border-emerald-950 font-mono text-2xl"
                placeholder="Effort Estimate"
                value={effortEstimate ?? ""}
                onChange={(e) => setEffortEstimate(Number(e.target.value))}
              />

              <div className="flex justify-between mt-5">
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-mono px-6 py-3 rounded-2xl"
                >
                  Create
                </button>
                <button
                  type="button"
                  className="bg-pink-500 hover:bg-pink-600 text-white font-mono px-6 py-3 rounded-2xl"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateTaskDialog;

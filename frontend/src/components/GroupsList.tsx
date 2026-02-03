import type { TaskGroup } from "../model/TaskGroup";

interface GroupsListProps {
  groupsList: TaskGroup[];
}

function GroupsList({ groupsList }: GroupsListProps) {
  return (
    <div className="flex flex-col gap-20">
      {groupsList.map((group) => (
        <div className="bg-emerald-50 hover:bg-emerald-100 hover:cursor-pointer p-10 text-emerald-950 border-3 rounded-2xl border-emerald-950">
          <div className="font-mono text-6xl mb-5">{group.title}</div>
          <div className="font-mono text-4xl">{group.description}</div>
        </div>
      ))}
    </div>
  );
}

export default GroupsList;

"use client";

import { useState } from "react";
import type { Task } from "@/lib/types";
import TaskList from "./Tasklist";
import TaskForm from "./Taskform";

interface Props {
  initialTasks: Task[];
}

export default function TaskManager({ initialTasks }: Props) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  function handleCreated(task: Task) {
    setTasks((prev) => [task, ...prev]);
  }

  function handleUpdated(updated: Task) {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  function handleDeleted(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="task-manager">
      <TaskForm onCreated={handleCreated} />
      <TaskList
        tasks={tasks}
        onUpdated={handleUpdated}
        onDeleted={handleDeleted}
      />
    </div>
  );
}
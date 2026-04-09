"use client";

import { useState } from "react";
import type { Task, TaskFilter } from "@/lib/types";
import TaskItem from "./Taskitem";

interface Props {
  tasks: Task[];
  onUpdated: (task: Task) => void;
  onDeleted: (id: string) => void;
}

const FILTERS: TaskFilter[] = ["all", "active", "completed"];

const EMPTY_MESSAGES: Record<TaskFilter, { title: string; body: string; icon: string }> = {
  all:       { icon: "✦", title: "Nothing here yet",     body: "Add your first task above to get started." },
  active:    { icon: "◎", title: "All caught up!",        body: "No active tasks. Time to add more." },
  completed: { icon: "◉", title: "Nothing completed yet", body: "Finish some tasks to see them here." },
};

export default function TaskList({ tasks, onUpdated, onDeleted }: Props) {
  const [filter, setFilter] = useState<TaskFilter>("all");

  const counts = {
    all:       tasks.length,
    active:    tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  const filtered = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const empty = EMPTY_MESSAGES[filter];

  return (
    <div className="task-list-wrapper">
      <div className="filter-bar" role="tablist">
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            <span className="filter-count">{counts[f]}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">{empty.icon}</div>
          <strong>{empty.title}</strong>
          <p>{empty.body}</p>
        </div>
      ) : (
        <ul className="task-list" role="list">
          {filtered.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdated={onUpdated}
              onDeleted={onDeleted}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
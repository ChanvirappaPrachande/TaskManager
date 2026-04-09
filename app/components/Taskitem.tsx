"use client";

import { useState } from "react";
import type { Task } from "@/lib/types";
import { updateTask, deleteTask } from "@/lib/api";

interface Props {
  task: Task;
  onUpdated: (task: Task) => void;
  onDeleted: (id: string) => void;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function TaskItem({ task, onUpdated, onDeleted }: Props) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleToggle() {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateTask(task.id, { completed: !task.completed });
      onUpdated(updated);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    setLoading(true);
    setError(null);
    try {
      await deleteTask(task.id);
      onDeleted(task.id);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete");
      setLoading(false);
    }
  }

  async function handleEditSave() {
    const trimmed = editTitle.trim();
    if (!trimmed || trimmed === task.title) {
      setEditing(false);
      setEditTitle(task.title);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const updated = await updateTask(task.id, { title: trimmed });
      onUpdated(updated);
      setEditing(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleEditSave();
    if (e.key === "Escape") {
      setEditing(false);
      setEditTitle(task.title);
    }
  }

  return (
    <li
      className={`task-item ${task.completed ? "completed" : ""} ${loading ? "loading" : ""}`}
    >
      <div className="task-row">
        <input
          type="checkbox"
          className="task-checkbox"
          checked={task.completed}
          onChange={handleToggle}
          disabled={loading}
          aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
        />

        {editing ? (
          <input
            type="text"
            className="task-edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleEditSave}
            onKeyDown={handleKeyDown}
            autoFocus
            maxLength={200}
            disabled={loading}
          />
        ) : (
          <span
            className="task-title"
            onDoubleClick={() => !task.completed && setEditing(true)}
            title={task.completed ? undefined : "Double-click to edit"}
          >
            {task.title}
          </span>
        )}

        <div className="task-actions">
          {!task.completed && !editing && (
            <button
              className="btn btn-ghost"
              onClick={() => setEditing(true)}
              disabled={loading}
              aria-label="Edit task"
            >
              Edit
            </button>
          )}
          {editing && (
            <button
              className="btn btn-ghost"
              onClick={handleEditSave}
              disabled={loading}
            >
              Save
            </button>
          )}
          <button
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={loading}
            aria-label="Delete task"
          >
            ✕
          </button>
        </div>
      </div>

      <p className="task-date">Added {formatDate(task.createdAt)}</p>

      {error && <p className="error-msg task-error">{error}</p>}
    </li>
  );
}
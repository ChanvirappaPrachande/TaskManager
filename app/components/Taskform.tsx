"use client";

import { useState, useRef } from "react";
import type { Task } from "@/lib/types";
import { createTask } from "@/lib/api";

interface Props {
  onCreated: (task: Task) => void;
}

export default function TaskForm({ onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    try {
      const task = await createTask({ title: trimmed });
      onCreated(task);
      setTitle("");
      inputRef.current?.focus();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create task");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="task-form-wrapper">
      <form onSubmit={handleSubmit} className="task-form">
        <input
          ref={inputRef}
          type="text"
          className="task-input"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          maxLength={200}
          aria-label="New task title"
          autoComplete="off"
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || title.trim() === ""}
        >
          {loading ? "Adding…" : "+ Add"}
        </button>
      </form>
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
}
import type { Task, CreateTaskPayload, UpdateTaskPayload } from "./types";

const BASE = "/api/tasks";

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error ?? `Request failed with status ${res.status}`);
  }
  return data as T;
}

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(BASE, { cache: "no-store" });
  return handleResponse<Task[]>(res);
}

export async function createTask(payload: CreateTaskPayload): Promise<Task> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse<Task>(res);
}

export async function updateTask(
  id: string,
  payload: UpdateTaskPayload
): Promise<Task> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse<Task>(res);
}

export async function deleteTask(id: string): Promise<{ message: string }> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  return handleResponse<{ message: string }>(res);
}
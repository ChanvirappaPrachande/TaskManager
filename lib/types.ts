export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateTaskPayload = {
  title: string;
};

export type UpdateTaskPayload = {
  completed?: boolean;
  title?: string;
};

export type TaskFilter = "all" | "active" | "completed";
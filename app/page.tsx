import  prisma  from "@/lib/prisma";
import TaskManager from "./components/TaskManager";
import type { Task } from "@/lib/types";

export const dynamic = "force-dynamic";

async function getTasks(): Promise<Task[]> {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });
    return tasks.map((t) => ({
      ...t,
      createdAt: t.createdAt.toISOString(),
      updatedAt: t.updatedAt.toISOString(),
    }));
  } catch {
    return [];
  }
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default async function HomePage() {
  const tasks = await getTasks();
  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <main className="page">
      <div className="container">
        <header className="page-header">
          <p className="page-eyebrow">{getGreeting()}</p>
          <h1 className="page-title">
            Your <em>tasks,</em>
            <br />your flow.
          </h1>
          <p className="page-subtitle">
            Focus on what matters. One task at a time.
          </p>

          {total > 0 && (
            <div className="progress-wrapper">
              <span className="progress-label">
                <span>Progress</span>
                <span>{done} of {total} complete</span>
              </span>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )}

          <div className="stats-bar">
            <div className="stat">
              <span className="stat-value">{total}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat">
              <span className="stat-value">{total - done}</span>
              <span className="stat-label">Active</span>
            </div>
            <div className="stat">
              <span className="stat-value">{done}</span>
              <span className="stat-label">Done</span>
            </div>
          </div>
        </header>

        <TaskManager initialTasks={tasks} />
      </div>
    </main>
  );
}
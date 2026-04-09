import { createSwaggerSpec } from "next-swagger-doc";
import ReactSwagger from "../components/SwaggerUI";

export default async function ApiDocsPage() {
  const spec = await createSwaggerSpec({
    apiFolder: "app/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "My Next.js API",
        version: "1.0.0",
        description: "Interactive API documentation",
      },
    },
  });

  return (
    <main className="p-8 bg-white min-h-screen">
      <ReactSwagger spec={spec as Record<string, unknown>} />
    </main>
  );
}
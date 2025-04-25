import { Elysia } from "elysia";
import { routes } from "./routes/routes";
import swagger from "@elysiajs/swagger";

const app = new Elysia().listen(3000);

app.use(
  swagger({
    path: "/api/v1/docs",
    autoDarkMode: true,
    documentation: {
      info: {
        title: "Api de Agendamentos",
        version: "1.0.0",
        description:
          "Esta é a documentação da API para a aplicação de agendamentos. Feito em Elysia.",
      },
      tags: [
        { name: "App", description: "Endpoints da aplicação" },
        { name: "Auth", description: "Endpoints de autenticação" },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            description: "Bearer token para autenticação",
          },
        },
      },
    },
  })
);

app.get("/hello", () => "Hello Elysia!", {
  detail: {
    tags: ["App"],
    summary: "Hello Elysia",
    description: "Endpoint de teste para verificar se a aplicação está rodando",
  },
});

app.use(routes);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

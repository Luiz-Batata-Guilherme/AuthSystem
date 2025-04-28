import { describe, expect, it } from "bun:test";

import { app } from "../index";

const ip = "http://localhost:3000";

describe("App", () => {
  it("deve retornar Hello Elysia", async () => {
    const response = await app.handle(new Request(`${ip}/`));
    const json = await response.json();
    console.log(json);

    expect(json).toEqual({ message: "Hello Elysia!" });
  });
});

describe("Auth", () => {
  const REGISTER_BODY = {
    name: "John Doe",
    gender: "Male",
    whatsapp: 11999999999,
    password: "123456",
  };

  describe("Register", () => {
    it("deve enviar mensagem se o usuário já existe", async () => {});
    it("deve enviar mensagem se a senha não é válida", async () => {});
    it("deve cadastrar um usuário", async () => {
      const http = await app.handle(
        new Request(`${ip}/auth/register`, {
          method: "POST",
          body: JSON.stringify(REGISTER_BODY),
        })
      );
      const json = await http.json();
      expect(http.status).toBe(200);
      expect(json).toEqual({ message: "Usuário cadastrado com sucesso!" });
    });
  });

  describe("Login", () => {
    it("deve fazer login de um usuário", async () => {});
    it("deve enviar mensagem se o usuário não existe", async () => {});
    it("deve enviar mensagem se a senha não é válida", async () => {});
  });
});

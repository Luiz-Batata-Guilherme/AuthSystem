import { describe, expect, it } from "bun:test";

import { app } from "../index";

const ip = "http://localhost:3000";

describe("App", () => {
  it("deve retornar Hello Elysia", async () => {
    const response = await app.handle(new Request(`${ip}/`));
    const json = await response.json();
    console.log(json);
    expect(response.status).toBe(200);
    expect(json).toEqual({ message: "Hello Elysia!" });
  });
});

describe("Auth", () => {
  const REGISTER_BODY = {
    name: "TesteUnitario",
    gender: "MALE",
    whatsapp:
      Math.floor(Math.random() * (99999999999 - 10000000000 + 1)) + 10000000000,
    password: "12345678",
  };
  const REGISTER_BODY_EQUAL = {
    name: "TesteUnitario",
    gender: "MALE",
    whatsapp: 12345678900,
    password: "12345678",
  };
  const REGISTER_BODY_PASSERR = {
    name: "TesteUnitario",
    gender: "MALE",
    whatsapp:
      Math.floor(Math.random() * (99999999999 - 10000000000 + 1)) + 10000000000,
    password: "12345",
  };

  describe("Register", () => {
    it("deve enviar mensagem se o usuário já existe", async () => {
      const http = await app.handle(
        new Request(`${ip}/auth/register`, {
          method: "POST",
          body: JSON.stringify(REGISTER_BODY_EQUAL),
          headers: {
            "Content-Type": "application/json",
          },
        })
      );
      const json = await http.json();
      expect(http.status).toBe(409);
      expect(json.message).toEqual("Whatsapp (12345678900) já Cadastrado");
    });
    it("deve enviar mensagem se a senha não é válida", async () => {
      const http = await app.handle(
        new Request(`${ip}/auth/register`, {
          method: "POST",
          body: JSON.stringify(REGISTER_BODY_PASSERR),
          headers: {
            "Content-Type": "application/json",
          },
        })
      );
      const json = await http.json();
      expect(http.status).toBe(422);
      expect(json.message).toEqual("Senha deve ter no mínimo 8 caracteres");
    });
    it("deve cadastrar um usuário", async () => {
      const http = await app.handle(
        new Request(`${ip}/auth/register`, {
          method: "POST",
          body: JSON.stringify(REGISTER_BODY),
          headers: {
            "Content-Type": "application/json",
          },
        })
      );
      const json = await http.json();
      expect(http.status).toBe(200);
      expect(json.message).toEqual("Usuário cadastrado com sucesso");
    });
  });

  describe("Login", () => {
    it("deve fazer login de um usuário", async () => {});
    it("deve enviar mensagem se o usuário não existe", async () => {});
    it("deve enviar mensagem se a senha não é válida", async () => {});
  });
});

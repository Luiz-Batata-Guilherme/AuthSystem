import { Gender, Role } from "@prisma/client";

import { convertToLocalDate } from "@/lib/utils";
import { t } from "elysia";

export const UserModel = {
  create: t.Object({
    name: t.String({
      description: "Nome de usuário",
      minLength: 3,
      examples: "John Doe",
    }),
    gender: t.Enum(Gender, {
      description: "Gênero do usuário",
      default: "MALE",
    }),
    whatsapp: t.Number({
      description: "Número do WhatsApp",
      format: "phone",
      minLength: 11,
      default: 12345678900,
    }),
    password: t.String({ description: "Senha do usuário", minLength: 8 }),
  }),
  login: t.Object({
    whatsapp: t.Number({
      description: "Número do WhatsApp",
      format: "phone",
      minLength: 11,
      examples: 11999999999,
      default: 12345678900,
      error: {
        message: "Número de WhatsApp inválido",
      },
    }),
    password: t.String({
      description: "Senha do usuário",
      minLength: 8,
      error: {
        message: "Senha deve ter no mínimo 8 caracteres",
      },
    }),
  }),
  update: t.Object({
    name: t.String({ description: "Nome de usuário", minLength: 3 }),
    whatsapp: t.Number({
      description: "Número do WhatsApp",
      format: "phone",
      minLength: 11,
    }),
  }),
  delete: t.Object({
    id: t.String({ description: "ID do usuário", format: "uuid" }),
  }),
};

export const UserModelResponses = {
  created: t.Object(
    {
      message: t.String({
        format: "success",
        title: "Usuário cadastrado com sucesso",
        description: "Mensagem de sucesso ao cadastrar usuário",
        additionalInfo: t.String({
          description: "Informações adicionais sobre o cadastro",
        }),
        default: "Usuário cadastrado com sucesso",
      }),
      user: t.Object({
        id: t.String({ format: "uuid" }),
        name: t.String({ description: "Nome do usuário", default: "Jhon Doe" }),
        gender: t.Enum(Gender, {
          description: "Gênero do usuário",
          optional: true,
          default: "MALE",
        }),
        whatsapp: t.Number({
          description: "Número do WhatsApp",
          format: "phone",
          minLength: 11,
          default: 12345678900,
        }),
      }),
    },
    {
      title: "Resposta ao cadastrar usuário",
      description: "Usuário cadastrado com sucesso",
      additionalInfo: t.String({
        description: "Informações adicionais sobre o cadastro",
      }),
      examples: {
        message: "string",
        user: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "string",
          gender: "MALE",
          whatsapp: "12345678900",
        },
      },
    }
  ),
  delete: t.Object({
    message: t.String({
      format: "success",
      title: "Usuário deletado com sucesso",
    }),
    user: t.Object({
      id: t.String({ format: "uuid" }),
      name: t.String(),
    }),
  }),
  me: t.Object(
    {
      id: t.String({ description: "Id do usuário", format: "uuid" }),
      role: t.Enum(Role, {
        description: "Cargo",
        default: "USER",
      }),
      name: t.String({ description: "Nome do usuário", default: "John Doe" }),
      gender: t.Enum(Gender, {
        description: "Genero do usuário",
        default: "MALE",
      }),
      whatsapp: t.Number({
        description: "Whatsapp do usuário",
        default: "12345678900",
      }),
      createdAt: t.String({
        description: "Data de criação do usuário",
        default: convertToLocalDate(new Date(2025, 0, 1)),
      }),
      updatedAt: t.String({
        description: "Data de atualização do usuário",
        default: convertToLocalDate(new Date(2025, 0, 1)),
      }),
    },
    {
      description: "Retorna os dados do usuário",
    }
  ),
};

export type UserCreate = typeof UserModel.create.static;
export type UserUpdate = typeof UserModel.update.static;
export type UserDelete = typeof UserModel.delete.static;
export type UserLogin = typeof UserModel.login.static;

import { SchemaValidator, Static, t } from "elysia";

import { Gender } from "@prisma/client";

const loginDTO = t.Object({
  whatsapp: t.Number({ format: "phone", minLength: 11 }),
  password: t.String({ minLength: 8 }),
});

const registerDTO = {
  register: t.Object({
    name: t.String({ minLength: 3 }),
    gender: t.Enum(Gender),
    whatsapp: t.Number({ format: "phone", minLength: 11 }),
    password: t.String({ minLength: 8 }),
  }),
  update: t.Object({
    name: t.String({ minLength: 3 }),
    whatsapp: t.Number({ format: "phone", minLength: 11 }),
  }),
  delete: t.Object({
    id: t.String({ format: "uuid" }),
  }),
};
export type RegisterDTO = Static<typeof registerDTO.register>;
export type UpdateDTO = Static<typeof registerDTO.update>;
export type DeleteDTO = Static<typeof registerDTO.delete>;
export type LoginDTO = Static<typeof loginDTO>;
export { loginDTO, registerDTO };

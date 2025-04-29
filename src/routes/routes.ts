import { Auth } from "./Auth/auth.routes";
import Elysia from "elysia";
import { User } from "./User/user.routes";

export const routes = new Elysia().use(Auth).use(User);

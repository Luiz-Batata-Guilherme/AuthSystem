import Elysia from "elysia";
import { Login } from "./Auth/login.route";
import { Register } from "./Auth/register.route";

export const routes = new Elysia().use(Login).use(Register);

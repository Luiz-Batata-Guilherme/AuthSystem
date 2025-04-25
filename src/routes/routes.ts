import Elysia from "elysia";
import { Login } from "./Auth/login";
import { Register } from "./Auth/register";

export const routes = new Elysia().use(Login).use(Register);

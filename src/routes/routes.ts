import { Auth } from "./Auth/register.route";
import Elysia from "elysia";

export const routes = new Elysia().use(Auth);

import { Router } from "express";

import UserController from "../controllers/user.ts";

const routes = Router();

routes.post("/auth/register", UserController.register);
routes.post("/auth/login", UserController.login);

export default routes;

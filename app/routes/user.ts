import { Router } from "express";

import UserController from "../controllers/user.ts";

const routes = Router();

routes.post("/", async (req, res, next) => {
    try {
        const { register, login, validate } = req.query;

        if (register !== undefined) {
            await UserController.register(req, res, next);
            return;
        }

        if (login !== undefined) {
            await UserController.login(req, res, next);
            return;
        }

        if (validate !== undefined) {
            await UserController.validate(req, res, next);
            return;
        }

        next();
    } catch (err) {
        next(err);
    }
});

routes.get("/:userId", UserController.get);

export default routes;

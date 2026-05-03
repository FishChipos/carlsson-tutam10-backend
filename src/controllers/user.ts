import { type Request, type Response, type NextFunction } from "express";

import UserService from "../services/user";

export default class UserController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                res.status(400).json({
                    success: false,
                    message: "User registration failed! (Missing user details)",
                    payload: null
                });
                return;
            }

            const user = await UserService.register({
                name, email, password
            });

            res.status(201).json({
                success: true,
                message: "User registration succeeded.",
                payload: user,
            });

            return;
        } catch (err) {
            next(err);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({
                    success: false,
                    message: "User login failed! (Missing user details)",
                    payload: null
                });
                return;
            }

            const payload = await UserService.login({
                email, password
            });

            if (!payload) {
                res.status(404).json({
                    success: false,
                    message: "User login failed! (User not found)",
                    payload: null
                })
                return;
            }

            res.status(200).json({
                success: true,
                message: "User login successful.",
                payload
            });

            return;
        } catch (err) {
            next(err);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;

            const user = await UserService.get(userId as string);

            if (!user) {
                res.status(404).json({
                    success: false,
                    message: "User get failed! (User not found)",
                    payload: null,
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: "User get successful.",
                payload: user,
            });
        } catch (err) {
            next(err);
        }
    }

    static async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const { jwtToken } = req.body;
            
            const valid = await UserService.validate(jwtToken);

            if (valid) {
                res.status(200).json({
                    success: true,
                    message: "User auth validation successful.",
                    payload: null,
                })
                return;
            } else {
                res.status(200).json({
                    success: false,
                    message: "User auth validation failed!",
                    payload: null,
                })
                return;
            }
        } catch (err) {
            next(err);
        }
    }
}

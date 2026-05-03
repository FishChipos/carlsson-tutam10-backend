import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.ts";

const SALT_ROUNDS = 10;

export default class UserService {
    static async register({ name, email, password }: {
        name: string;
        email: string;
        password: string;
    }) {
        if (!await User.getByEmail(email)) {
            return;
        }

        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

        const user = await User.create({ name, email, passwordHash });

        return user;
    } 

    static async login({ email, password }: {
        email: string;
        password: string;
    }) {
        const user = await User.getByEmail(email);

        if (!user) {
            return;
        }

        if (await bcrypt.compare(password, user.passwordHash)) {
            return;
        }

        const jwtPayload = {
            userId: user.userId,
            email: user.email,
        };

        const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET as string, {
            expiresIn: "24h",
        })

        return {
            jwtToken,
            user,
        };
    }
}

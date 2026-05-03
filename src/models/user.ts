import { sql } from "../database/database";

export default class User {
    static async create({ name, email, passwordHash }: {
        name: string;
        email: string;
        passwordHash: string;
    }) {
        const result = await sql`
            insert into users
            ${sql({ name, email, passwordHash })}
            returning *
        `;

        return result[0];
    }

    static async getAll() {
        const result = await sql`
            select * from users
        `;

        return result;
    }

    static async get(userId: string) {
        const result = await sql`
            select user_id, * from users
            where user_id = ${userId}
        `;

        return result[0];
    }

    static async getByName(name: string) {
        const result = await sql`
            select name, * from users
            where name = ${name}
        `;

        return result[0];
    }

    static async getByEmail(email: string) {
        const result = await sql`
            select email, * from users
            where email = ${email}
        `;

        return result[0];
    }

    static async update({ userId, name, email, passwordHash }: {
        userId: string;
        name: string;
        email: string;
        passwordHash: string;
    }) {
        const result = await sql`
            update users
            set ${sql({ name, email, passwordHash })}
            where user_id = ${userId}
        `;

        return result[0];
    }

    static async delete(userId: string) {
        await sql`
            delete from users
            where userId = ${userId}
        `;
    }
}

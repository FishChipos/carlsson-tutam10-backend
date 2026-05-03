import { sql } from "../database/database.js";

export default class Organization {
    static async create({ name }: {
        name: string;
    }) {
        const result = await sql`
            insert into organizations
            ${sql({ name })}
            returning *
        `;

        return result[0];
    }

    static async getAll() {
        const result = await sql`
            select * from organizations
        `;

        return result;
    }

    static async get(organizationId: string) {
        const result = await sql`
            select * from organizations
            where organization_id = ${organizationId}
        `;

        return result[0];
    }

    static async addUser({ organizationId, userId, role }: {
        organizationId: string;
        userId: string;
        role: "owner" | "member";
    }) {
        const result = await sql`
            insert into organization_users
            ${sql({ organizationId, userId, role })}
            returning *
        `;

        return result[0];
    }

    static async getUser({ organizationId, userId }: {
        organizationId: string;
        userId: string;
    }) {
        const result = await sql`
            select * from organization_users
            where organization_id = ${organizationId} and user_id = ${userId}
        `;

        return result[0]
    }

    static async removeUser({ organizationId, userId }: {
        organizationId: string;
        userId: string;
    }) {
        await sql`
            delete from organization_users
            where organization_id = ${organizationId} and user_id = ${userId}
        `
    }

    static async update({ organizationId, name }: {
        organizationId: string;
        name: string;
    }) {
        const result = await sql`
            update organizations
            set ${sql({ name })}
            where organization_id = ${organizationId}
            returning *
        `;

        return result[0];
    }

    static async delete(organizationId: string) {
        await sql`
            delete from organizations
            where organization_id = ${organizationId}
        `
    }
}

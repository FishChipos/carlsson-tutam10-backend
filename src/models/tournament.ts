import { sql } from "../database/database.js";

export default class Tournament {
    static async create({ organizationId, name, tabLink, visibility, startTime }: {
        organizationId: string;
        name: string;
        tabLink: string;
        visibility: "public" | "unlisted" | "private";
        startTime: string;
    }) {
        const result = await sql`
            insert into tournaments
            ${sql({ organizationId, name, tabLink, visibility, startTime })}
            returning *
        `;

        return result[0];
    }

    static async getAll() {
        const result = await sql`
            select * from tournaments
        `;

        return result;
    }

    static async get(tournamentId: string) {
        const result = await sql`
            select * from tournaments
            where tournament_id = ${tournamentId}
        `;

        return result[0];
    }

    static async addUser({ tournamentId, userId, role }: {
        tournamentId: string;
        userId: string;
        role: "convenor" | "tabulator" | "chief adjudicator" | "debater" | "adjudicator";
    }) {
        const result = await sql`
            insert into tournament_users
            ${sql({ tournamentId, userId, role })}
            returning *
        `;

        return result[0];
    }

    static async getUser({ tournamentId, userId }: {
        tournamentId: string;
        userId: string;
    }) {
        const result = await sql`
            select * from tournament_users
            where tournament_id = ${tournamentId} and user_id = ${userId}
        `;

        return result[0]
    }

    static async removeUser({ tournamentId, userId }: {
        tournamentId: string;
        userId: string;
    }) {
        await sql`
            delete from tournament_users
            where tournament_id = ${tournamentId} and user_id = ${userId}
        `
    }

    static async update({ tournamentId, organizationId, name, tabLink, visibility, startTime }: {
        tournamentId: string;
        organizationId: string;
        name: string;
        tabLink: string;
        visibility: "public" | "unlisted" | "private";
        startTime: string;
    }) {
        const result = await sql`
            update tournaments
            set ${sql({ organizationId, name, tabLink, visibility, startTime })}
            where tournament_id = ${tournamentId}
            returning *
        `;

        return result[0];
    }

    static async delete(tournamentId: string) {
        await sql`
            delete from tournaments
            where tournament_id = ${tournamentId}
        `
    }
}

import Organization from "../models/organization";
import Tournament from "../models/tournament";

export default class Tournameervice {
    static async create({ userId, organizationId, name, tabLink, visibility, startTime }: {
        userId: string;
        organizationId: string;
        name: string;
        tabLink: string;
        visibility: "public" | "unlisted" | "private";
        startTime: string;
    }) {
        const organizationUser = await Organization.getUser({
            organizationId, userId
        });

        if (organizationUser.role != "owner") {
            return;
        }

        return await Tournament.create({
            organizationId, name, tabLink, visibility, startTime
        });
    }

    static async getAll() {
        return await Tournament.getAll();
    }

    static async get(tournamentId: string) {
        return await Tournament.get(tournamentId);
    }

    static async addUser({ userId, tournamentId, userIdToBeAdded, role }: {
        userId: string;
        tournamentId: string;
        userIdToBeAdded: string;
        role: "convenor" | "tabulator" | "chief adjudicator" | "debater" | "adjudicator";
    }) {
        let allowed = false;

        const tournament = await Tournament.get(tournamentId);

        const organizationUser = await Organization.getUser({
            organizationId: tournament.organizationId,
            userId
        });

        const tournamentUser = await Tournament.getUser({
            tournamentId, userId
        });

        if (organizationUser.role == "owner") {
            allowed = true;
        }

        if (["convenor", "tabulator", "chief adjudicator"].includes(tournamentUser.role)) {
            allowed = true;
        }

        if (!allowed) {
            return;
        }

        return await Tournament.addUser({
            tournamentId, userId: userIdToBeAdded, role: role
        });
    }

    static async getUser({ tournamentId, userId }: {
        tournamentId: string;
        userId: string;
    }) {
        return await Tournament.getUser({
            tournamentId, userId
        });
    }

    static async removeUser({ userId, tournamentId, userIdToBeRemoved }: {
        userId: string;
        tournamentId: string;
        userIdToBeRemoved: string;
    }) {
        let allowed = false;

        const tournament = await Tournament.get(tournamentId);

        const organizationUser = await Organization.getUser({
            organizationId: tournament.organizationId,
            userId
        });

        const tournamentUser = await Tournament.getUser({
            tournamentId, userId
        });

        if (organizationUser.role == "owner") {
            allowed = true;
        }

        if (["convenor", "tabulator", "chief adjudicator"].includes(tournamentUser.role)) {
            allowed = true;
        }

        if (!allowed) {
            return;
        }

        await Tournament.removeUser({
            tournamentId, userId: userIdToBeRemoved
        });
    }

    static async delete({ userId, tournamentId }: {
        userId: string;
        tournamentId: string;
    }) {
        const tournament = await Tournament.get(tournamentId);

        const organizationUser = await Organization.getUser({
            organizationId: tournament.organizationId,
            userId
        });

        if (organizationUser.role != "owner") {
            return;
        }

        await Tournament.delete(tournamentId);
    }
}

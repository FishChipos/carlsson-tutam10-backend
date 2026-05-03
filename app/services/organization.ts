import Organization from "../models/organization.ts";

export default class OrganizationService {
    static async create({ userId, name }: {
        userId: string;
        name: string;
    }) {
        const organization = await Organization.create({
            name
        });

        await Organization.addUser({
            organizationId: organization.organizationId,
            userId,
            role: "owner"
        });

        return organization;
    }

    static async getAll() {
        return await Organization.getAll();
    }

    static async get(organizationId: string) {
        return await Organization.get(organizationId);
    }

    static async addUser({ userId, organizationId, userIdToBeAdded, role }: {
        userId: string;
        organizationId: string;
        userIdToBeAdded: string;
        role: "owner" | "member";
    }) {
        const organizationUser = await Organization.getUser({
            organizationId: organizationId,
            userId
        });

        if (organizationUser.role != "owner") {
            return;
        }

        return await Organization.addUser({
            organizationId, userId: userIdToBeAdded, role: role
        });
    }

    static async getUser({ organizationId, userId }: {
        organizationId: string;
        userId: string;
    }) {
        return await Organization.getUser({
            organizationId, userId
        });
    }

    static async removeUser({ userId, organizationId, userIdToBeRemoved }: {
        userId: string;
        organizationId: string;
        userIdToBeRemoved: string;
    }) {
        const organizationUser = await Organization.getUser({
            organizationId: organizationId,
            userId
        });

        if (organizationUser.role != "owner") {
            return;
        }

        return await Organization.removeUser({
            organizationId, userId: userIdToBeRemoved
        });
    }

    static async delete({ userId, organizationId }: {
        userId: string;
        organizationId: string;
    }) {
        const organizationUser = await Organization.getUser({
            organizationId,
            userId
        });

        if (organizationUser.role != "owner") {
            return;
        }

        await Organization.delete(organizationId);
    }
}

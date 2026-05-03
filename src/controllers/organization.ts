import type { Request, Response, NextFunction } from "express";
import OrganizationService from "../services/organization.js";

export default class OrganizationController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const organizations = await OrganizationService.getAll();

            res.status(200).json({
                success: true,
                message: "Organization get all successful.",
                payload: organizations,
            })
        } catch (err) {
            next(err);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { organizationId } = req.params;

            const organization = await OrganizationService.get(organizationId as string);

            res.status(200).json({
                success: true,
                message: "Organization get successful.",
                payload: organization,
            })
        } catch (err) {
            next(err);
        }
    }
}

import { Router } from "express";

import OrganizationController from "../controllers/organization.js";

const routes = Router();

routes.get("/", OrganizationController.getAll);
routes.get("/:organizationId", OrganizationController.get);

export default routes;

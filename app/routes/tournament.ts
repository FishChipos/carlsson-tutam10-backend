import { Router } from "express";

import TournamentController from "../controllers/tournament.ts";

const routes = Router();

routes.get("/", TournamentController.getAll);

export default routes;

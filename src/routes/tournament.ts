import { Router } from "express";

import TournamentController from "../controllers/tournament.js";

const routes = Router();

routes.get("/", TournamentController.getAll);

export default routes;

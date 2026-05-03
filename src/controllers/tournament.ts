import type { Request, Response, NextFunction } from "express";
import TournamentService from "../services/tournament.js";

export default class TournamentController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        const tourname = await TournamentService.getAll();

        res.status(200).json({
            success: true,
            message: "Tournament get all successful.",
            payload: tourname,
        })
    }
}

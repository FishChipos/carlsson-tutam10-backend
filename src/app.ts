import "dotenv/config";

import express from "express";
import cors from "cors";

import { seed } from "./database/database.js";
import userRoutes from "./routes/user.js";
import tournamentRoutes from "./routes/tournament.js";
import organizationRoutes from "./routes/organization.js";

await seed();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/tournament", tournamentRoutes);
app.use("/organization", organizationRoutes);

app.get("/health", (_, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use(/(.*)/, (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    payload: null,
  });
});

app.listen(process.env.PORT, () => {
    console.log(`API up at port ${process.env.PORT}.`);
});

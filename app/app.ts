import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";

import { seed } from "./database.ts";
import userRoutes from "./routes/user.ts";
import tournamentRoutes from "./routes/tournament.ts";
import organizationRoutes from "./routes/organization.ts";

await seed();

const app = express();

app.use(cors());

app.use(helmet());

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

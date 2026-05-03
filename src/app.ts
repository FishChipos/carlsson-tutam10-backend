import "dotenv/config";

import express from "express";
import cors from "cors";

import { seed } from "./database/database";
import userRoutes from "./routes/user";
import tournamentRoutes from "./routes/tournament";
import organizationRoutes from "./routes/organization";

await seed();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express on Vercel!' });
});

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

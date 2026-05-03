import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";

import { seed } from "./database.ts";
import userRoutes from "./routes/user.ts";

await seed();

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(helmet);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);

app.use(/(.*)/, (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    payload: null,
  });
});

app.listen(process.env.PORT);

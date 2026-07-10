import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet"
import morgan from "morgan"

import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import reportRoutes from "./routes/report.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/reports",reportRoutes);

// Health Check Route
app.get("/", (req, res) => {
    res.send("Report Management API Running...");
});

export default app;
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import authMiddleware from "./middleware/auth.middleware.js";

dotenv.config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// Health Check Route
app.get("/", (req, res) => {
    res.send("Report Management API Running...");
});

export default app;
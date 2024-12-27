import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use(
  express.json({
    limit: "50mb",
    extended: true,
  })
);

app.use(cookieParser());

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

import authRoutes from "./routes/auth.routes.js";
import youtubeRoutes from "./routes/youtube.routes.js";
import viewsRoutes from "./routes/views.routes.js";
app.use("/api/auth", authRoutes);
app.use("/api", youtubeRoutes);
app.use("/api/view", viewsRoutes);

export default app;

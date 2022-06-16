import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import http from "http";
import { config } from "./config/config";
import userRoutes from "./routes/User";
import saucesRoutes from "./routes/Sauces";

const app: Express = express();

/** Connect to Mongo */
mongoose
  .connect(config.db.url, { retryWrites: true, w: "majority" })
  .then(() => {
    console.log("MongoDB connected successfully.");
    StartServer();
  })
  .catch((error) => console.error(error));

/** Only Start Server if MongoDB is connected */
const StartServer = () => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(
      `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );
    res.on("finish", () => {
      console.log(
        `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
      );
    });
    next();
  });

  /** Middlewares */
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  /** Routes */
  app.use("/api/auth", userRoutes);
  app.use("/api", saucesRoutes);
  app.use(express.static(path.join(__dirname, "../public")));

  /** Healthcheck */
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Server Working" });
  });

  /** Error handling */
  app.use((req: Request, res: Response) => {
    const error = new Error("Not found");
    console.error(error);
    res.status(404).json({
      message: error.message,
    });
  });

  const server = http.createServer(app);
  server.listen(config.server.port, () => {
    console.log(
      `⚡️[server]: Server is running at https://localhost:${config.server.port}`
    );
  });
};

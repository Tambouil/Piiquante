import "./app";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { signup } from "./controllers/user";

const app: Express = express();
const port = 3000;

// Add a list of allowed origins.
const allowedOrigins = ["http://localhost:3000"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
// Then pass these options to cors:
app.use(cors(options));
app.use(express.json());

app.post("/api/auth/signup", signup);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

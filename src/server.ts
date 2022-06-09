import express, { Express, Request, Response } from "express";
import cors from "cors";
import mongoose, { Schema, model, connect } from "mongoose";

const app: Express = express();
const port = 3000;

mongoose
  .connect(
    "mongodb+srv://Tambouil:tPXYNHrNSuu1mjOj@cluster0.fhmih.mongodb.net/piquante?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string;
  password: string;
}
// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  password: { type: String, required: true },
});

// Add a list of allowed origins.
const allowedOrigins = ["http://localhost:3000"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
// Then pass these options to cors:
app.use(cors(options));
app.use(express.json());

app.post("/api/auth/signup", (req: Request, res: Response) => {
  res.send({ message: "Registered user" });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

import dotenv from "dotenv";

dotenv.config();

const DB_USERNAME = process.env.DB_USERNAME || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "";
const DB_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.fhmih.mongodb.net/${DB_NAME}`;

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 1337;

export const config = {
  db: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    url: DB_URL,
  },
  server: {
    port: SERVER_PORT,
  },
};

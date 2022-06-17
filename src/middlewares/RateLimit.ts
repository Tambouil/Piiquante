import { rateLimit } from "express-rate-limit";

export = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP",
});

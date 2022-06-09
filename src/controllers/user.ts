import { Request, Response } from "express";
import { User } from "../models/user";

export const signup = (req: Request, res: Response) => {
  const email = req.body.email;
  const pwd = req.body.password;
  const user = new User({
    email: email,
    password: pwd,
  });
  user
    .save()
    .then(() => res.send({ message: "Registered user" }))
    .catch((error) => res.status(500).json({ error }));
};

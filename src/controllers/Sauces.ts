import { Request, Response, NextFunction } from "express";
import { Sauce } from "../models/Sauce";

const createSauce = (req: Request, res: Response, next: NextFunction) => {
  // const sauceObject = JSON.parse(req.body.sauce);
  // delete sauceObject._id;
  const newSauce = new Sauce({
    ...req.body,
  });
  newSauce
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

const readSauce = (req: Request, res: Response, next: NextFunction) => {
  console.log("hello");
  res.send("hello");
};

export default { readSauce, createSauce };

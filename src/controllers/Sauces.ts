import { Request, Response, NextFunction } from "express";
import Sauce from "../models/Sauce";

const createSauce = (req: Request, res: Response, next: NextFunction) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const newSauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/src/public/images/${
      req.file!.filename
    }`,
  });
  newSauce
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

const readSauce = (req: Request, res: Response, next: NextFunction) => {
  console.log("hello");
  Sauce.find({}).then((sauce) => {
    res.send(sauce);
  });
};

export default { readSauce, createSauce };

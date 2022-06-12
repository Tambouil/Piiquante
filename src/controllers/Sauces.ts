import { Request, Response, NextFunction } from "express";
import Sauce from "../models/Sauce";

const createSauce = async (req: Request, res: Response, next: NextFunction) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const newSauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/src/public/images/${
      req.file!.filename
    }`,
  });
  try {
    await newSauce.save();
    res.status(201).json({ message: "Sauce created !" });
  } catch (error) {
    res.status(409).json({ error });
  }
};

const readSauce = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sauces = await Sauce.find({});
    res.send(sauces);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const readOneSauce = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("hello world");
};

export default { readSauce, createSauce, readOneSauce };

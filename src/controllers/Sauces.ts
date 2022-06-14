import { Request, Response } from "express";
import Sauce from "../models/Sauce";
import { unlink } from "fs/promises";

const createSauce = async (req: Request, res: Response) => {
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

const readOneSauce = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const oneSauce = await Sauce.findById(id);
    res.send(oneSauce);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const editSauce = async (req: Request, res: Response) => {
  const { id } = req.params;
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/src/public/images/${
          req.file!.filename
        }`,
      }
    : { ...req.body };
  try {
    const { id } = req.params;
    const oneSauce = await Sauce.findById(id);
    if (oneSauce!.userId && oneSauce!.userId !== req.auth!.userId) {
      return res.status(403).json({ message: "Requête non autorisée" });
    }
    const sauceToUpdate = await Sauce.findByIdAndUpdate(id, { ...sauceObject });
    if (sauceToUpdate == null) {
      return res.status(404).json({ message: "Sauce is missing in database" });
    }
    res.status(200).json({ message: "Sauce edited !" });
  } catch (error) {
    res.status(409).json({ error });
  }
};

const deleteSauce = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const oneSauce = await Sauce.findById(id);

    if (oneSauce!.userId !== req.auth!.userId) {
      return res.status(403).json({ message: "unauthorized request" });
    }

    const sauceToDelete = await Sauce.findByIdAndDelete(id);
    if (sauceToDelete) {
      const filename = sauceToDelete.imageUrl.split("/images/")[1];
      await unlink(`src/public/images/${filename}`);
      res.status(200).json({ message: "image deleted !" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const readSauce = async (req: Request, res: Response) => {
  try {
    const sauces = await Sauce.find({});
    res.send(sauces);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default { readSauce, createSauce, readOneSauce, editSauce, deleteSauce };

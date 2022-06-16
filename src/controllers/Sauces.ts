import { Request, Response } from "express";
import Sauce from "../models/Sauce";
import { unlink } from "fs/promises";

const createSauce = async (req: Request, res: Response) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const newSauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file!.filename
    }`,
  });
  try {
    await newSauce.save();
    res.status(201).json({ message: "Sauce created !" });
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

const readOneSauce = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const oneSauce = await Sauce.findById(id);
    res.send(oneSauce);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const editSauce = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const sauce = await Sauce.findById(id);

    if (sauce?.userId && sauce.userId !== req.auth?.userId) {
      return res.status(403).json({ message: "unauthorized request" });
    }
    if (req.file) {
      const filename = sauce?.imageUrl.split("/images/")[1];
      await unlink(`public/images/${filename}`);
    }
    const sauceObject = req.file
      ? {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file!.filename
          }`,
        }
      : { ...req.body };
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
  const { id } = req.params;
  try {
    const sauce = await Sauce.findById(id);
    if (sauce?.userId !== req.auth?.userId) {
      return res.status(403).json({ message: "unauthorized request" });
    }

    const sauceToDelete = await Sauce.findByIdAndDelete(id);
    if (!sauceToDelete) {
      return res.status(404).json({ message: "sauce not found" });
    }
    const filename = sauceToDelete.imageUrl.split("/images/")[1];
    await unlink(`public/images/${filename}`);
    res.status(200).json({ message: "Sauce deleted !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const likeSauce = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, like } = req.body;
  try {
    const sauceToLike = await Sauce.findById(id);
    if (!sauceToLike || ![-1, 0, 1].includes(like)) {
      return res.status(400).json({ message: "Bad request" });
    }
    let { usersLiked, usersDisliked } = sauceToLike;

    switch (like) {
      case 1:
        usersLiked = usersLiked.includes(userId)
          ? usersLiked
          : [...usersLiked, userId];
        usersDisliked = usersDisliked.filter((id) => id !== userId);
        break;
      case -1:
        usersLiked = usersLiked.filter((id) => id !== userId);
        usersDisliked = usersDisliked.includes(userId)
          ? usersDisliked
          : [...usersDisliked, userId];
        break;
      case 0:
        usersLiked = usersLiked.filter((id) => id !== userId);
        usersDisliked = usersDisliked.filter((id) => id !== userId);
        break;
      default:
        return res.status(400).json({ message: "Bad request" });
    }
    const likes = usersLiked.length;
    const dislikes = usersDisliked.length;
    await Sauce.findByIdAndUpdate(id, {
      usersLiked,
      usersDisliked,
      likes,
      dislikes,
    });
    res.status(200).send({ message: "sauce liked or disliked !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default {
  readSauce,
  createSauce,
  readOneSauce,
  editSauce,
  deleteSauce,
  likeSauce,
};

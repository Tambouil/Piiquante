import { Request, Response } from "express";
import Sauce from "../models/Sauce";
import { unlink } from "fs/promises";

const createSauce = async (req: Request, res: Response) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const newSauce = new Sauce({
    ...sauceObject,
    likes: 0,
    dislikes: 0,
    imageUrl: `${req.protocol}://${req.get("host")}/public/images/${
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
  try {
    const { id } = req.params;
    const oneSauce = await Sauce.findById(id);

    if (oneSauce!.userId && oneSauce!.userId !== req.auth!.userId) {
      return res.status(403).json({ message: "unauthorized request" });
    }
    if (req.file) {
      const filename = oneSauce?.imageUrl.split("/images/")[1];
      await unlink(`public/images/${filename}`);
    }
    const sauceObject = req.file
      ? {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get("host")}/public/images/${
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
  try {
    const { id } = req.params;
    const oneSauce = await Sauce.findById(id);

    if (oneSauce?.userId !== req.auth?.userId) {
      return res.status(403).json({ message: "unauthorized request" });
    }

    const sauceToDelete = await Sauce.findByIdAndDelete(id);
    if (!sauceToDelete) {
      throw new Error("nothing to delete");
    }
    const filename = sauceToDelete.imageUrl.split("/images/")[1];
    await unlink(`public/images/${filename}`);
    res.status(200).json({ message: "image deleted !" });
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

const likeSauce = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sauceToLike = await Sauce.findById(id);

    if (!sauceToLike || ![-1, 0, 1].includes(req.body.like)) {
      return res.status(400).json({ message: "invalid request" });
    }

    const { usersLiked, usersDisliked } = sauceToLike;
    if (
      (!usersLiked.includes(req.body.userId) && req.body.like == 1) ||
      (!usersDisliked.includes(req.body.userId) && req.body.like == -1)
    ) {
      const arrayToUpdate = req.body.like == 1 ? usersLiked : usersDisliked;
      arrayToUpdate.push(req.body.userId);
      req.body.like === 1 ? ++sauceToLike.likes : ++sauceToLike.dislikes;
    }
    if (
      (usersLiked.includes(req.body.userId) && req.body.like == 0) ||
      (usersDisliked.includes(req.body.userId) && req.body.like == 0)
    ) {
      usersLiked.includes(req.body.userId)
        ? --sauceToLike.likes
        : --sauceToLike.dislikes;
      const arrayToUpdate = usersLiked.includes(req.body.userId)
        ? usersLiked
        : usersDisliked;
      const likesUserIndex = arrayToUpdate.indexOf(req.body.userId);
      arrayToUpdate.splice(likesUserIndex, 1);
    }
    await sauceToLike.save();
    res.status(201).json({ message: "Success" });
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

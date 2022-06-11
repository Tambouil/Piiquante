import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req: Request, res: Response) => {
  const cryptedPwd = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    email: req.body.email,
    password: cryptedPwd,
  });
  try {
    await user.save();
    res.send({ message: "Registered user" });
  } catch (error) {
    res.status(409).json({ error });
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé !" });
    }
    const validPwd = await bcrypt.compare(password, user.password);
    if (!validPwd) {
      return res.status(403).json({ error: "Mot de passe incorrect !" });
    }
    res.status(200).json({
      userId: user._id,
      token: jwt.sign({ userId: user._id }, `${process.env.JWT_TOKEN}`, {
        expiresIn: "24h",
      }),
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default { signup, login };

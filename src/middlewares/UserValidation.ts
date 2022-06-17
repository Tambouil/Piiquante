import * as Yup from "yup";
import { Request, Response, NextFunction } from "express";

const userSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(3).required(),
});

export = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userSchema.validate(req.body);

    next();
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(400).json(error.message);
    } else {
      res.status(500).json({ error });
    }
  }
};

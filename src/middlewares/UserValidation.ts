import { Request, Response, NextFunction } from "express";
import * as Yup from "yup";
import YupPassword from "yup-password";

YupPassword(Yup);

const userSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().password().required(),
});
// => [
//   'password must be at least 8 characters',
//   'password must contain at least 1 uppercase letter',
//   'password must contain at least 1 number',
//   'password must contain at least 1 symbol',
// ]

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

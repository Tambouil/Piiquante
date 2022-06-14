import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface IDecodedToken {
  userId: string;
  iat: number;
  exp: number;
}
export = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization!.split(" ")[1];
    const decodedToken = <IDecodedToken>(
      jwt.verify(token, `${process.env.JWT_TOKEN}`)
    );
    const userId = decodedToken.userId;

    req.auth = { userId };

    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

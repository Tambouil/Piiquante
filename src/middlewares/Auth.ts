import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
  iat: number;
  exp: number;
}

export = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization!.split(" ")[1];
    const decodedToken = <DecodedToken>(
      jwt.verify(token, `${process.env.JWT_TOKEN}`)
    );
    const userId = decodedToken.userId;
    // req.userId = userId;
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

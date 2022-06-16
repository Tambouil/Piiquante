import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import fs from "fs";
import path from "path/posix";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    fs.mkdir("public/images", (err) => {
      callback(null, "public/images");
    });
  },

  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ): void => {
    const name = file.originalname.split(".")[0].replace(/\s/g, "_");
    callback(null, name + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

export default multer({ storage, fileFilter }).single("image");

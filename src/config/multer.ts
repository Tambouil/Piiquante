import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import fs from "fs";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    fs.mkdir("./src/public/images/", (err) => {
      callback(null, "src/public/images");
    });
  },

  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ): void => {
    const name = file.originalname.split(".")[0].replace(/\s/g, "_");
    const extension = file.mimetype.split("/")[1];
    callback(null, name + Date.now() + "." + extension);
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

export default multer({ storage: storage, fileFilter: fileFilter }).single(
  "image"
);

// import multer from "multer";

// export const upload = multer({ dest: "images/" }).single("image");

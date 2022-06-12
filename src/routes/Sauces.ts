import express from "express";
import auth from "../middlewares/Auth";
import controller from "../controllers/Sauces";
import multer from "../config/multer";

const router = express.Router();

router.get("/sauces", auth, controller.readSauce);
router.post("/sauces", auth, multer, controller.createSauce);
router.post("/sauces/:id", auth, controller.readOneSauce);

export = router;

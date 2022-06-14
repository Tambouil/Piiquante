import express from "express";
import auth from "../middlewares/Auth";
import controller from "../controllers/Sauces";
import multer from "../middlewares/multer";

const router = express.Router();

router.get("/sauces/:id", auth, controller.readOneSauce);
router.post("/sauces", auth, multer, controller.createSauce);
router.put("/sauces/:id", auth, multer, controller.editSauce);
router.delete("/sauces/:id", auth, controller.deleteSauce);
router.get("/sauces", auth, controller.readSauce);

export = router;

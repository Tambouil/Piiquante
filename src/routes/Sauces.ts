import express from "express";
const auth = require("../middlewares/auth");
import controller from "../controllers/Sauces";

const router = express.Router();

router.get("/sauces", auth, controller.readSauce);
router.post("/sauces", auth, controller.createSauce);

export = router;

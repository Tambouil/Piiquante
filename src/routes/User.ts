import express from "express";
import controller from "../controllers/User";
import userValidation from "../middlewares/UserValidation";

const router = express.Router();

router.post("/signup", userValidation, controller.signup);
router.post("/login", controller.login);

export = router;

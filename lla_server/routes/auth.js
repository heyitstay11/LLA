import { Router } from "express";
import validate from "../middlewares/validator.js";
import { signupSchema, loginSchema } from "../models/validationSchema.js";
import { loginUser, signUpUser } from "../controllers/authController.js";

const router = Router();

router.post("/signup", validate(signupSchema), signUpUser);

router.post("/login", validate(loginSchema), loginUser);

export default router;

import { Router } from "express";
import authRouter from "./auth.js";
import quizRouter from "./quiz.js";
import paymentRouter from "./payment.js";

const router = Router();

router.get("/", (_, res) => {
  res.send("Hello from API");
});

// forward /auth request to authRouter
router.use("/auth", authRouter);

// forward /quiz request to quizRouter
router.use("/quiz", quizRouter);

// forward /payment request to paymentRouter
router.use("/payment", paymentRouter);

export default router;

import { Router } from "express";
import authRouter from "./auth.js";
import quizRouter from "./quiz.js";
import paymentRouter from "./payment.js";
import courseRouter from "./course.js";
import qnaRouter from "./qna.js";

const router = Router();

router.get("/", (_, res) => {
  res.send("Hello from API");
});

// forward /auth request to authRouter
router.use("/auth", authRouter);

router.use("/quiz", quizRouter);

router.use("/payment", paymentRouter);

router.use("/course", courseRouter);

router.use("/qna", qnaRouter);

export default router;

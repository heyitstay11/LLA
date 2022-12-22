import { Router } from "express";
import User from "../models/user.js";
import Quiz from "../models/quiz.js";
import QuizQuestion from "../models/quizQuestion.js";
import { utils, config } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

// set cloudinary
const cloudinaryConfig = (req, res, next) => {
  config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  next();
};

router.use(cloudinaryConfig);

router.get("/", (req, res) => {
  res.send("yo");
});

router.get("/get-signature", async (_, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = await utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    process.env.CLOUDINARY_API_SECRET
  );
  res.json({ timestamp, signature });
});

router.get("/:id", async (req, res) => {
  const { id: quizId } = req.params;
  try {
    const quiz = await Quiz.findById(quizId).select("-updatedAt -__v");
    if (!quiz) return res.status(401).json({ message: "No Such Quiz exists" });
    res.status(200).json({ quiz });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/create", async (req, res) => {
  try {
    const { title, desc, questions } = req.body;
    const newQuiz = await Quiz.create({ title, desc, questions });
    res.status(201).json({ _id: newQuiz._id });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id: quizId } = req.params;
  const { title, desc, lang, course } = req.body;
  const { _id: userId } = req.user || { _id: "63105e341b0d0089697a124b" };
  try {
    const quiz = await Quiz.findOne({ _id: quizId, createdBy: userId });
    if (!quiz) return res.status(401).json({ message: "Improper Credentials" });

    await quiz.updateOne({ title, desc, lang, course }, { new: true });
    res.status(200).json({ id: quiz._id });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id: quizId } = req.params;
  const { _id: userId } = req.user || { _id: "63105e341b0d0089697a124b" };
  try {
    const quiz = await Quiz.findOne({ _id: quizId, createdBy: userId });
    if (!quiz) return res.status(401).json({ message: "Improper Credentials" });

    await QuizQuestion.deleteMany({ createdIn: quiz._id });
    await quiz.deleteOne();
    res.status(200).json({ id: quiz._id });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;

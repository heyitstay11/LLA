import { Router } from "express";
import validate from "../middlewares/validator.js";
import User from "../models/user.js";
import Quiz from "../models/quiz.js";
import {} from "../models/validationSchema.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

router.post(
  "/create",
  requireAuth,

  async (req, res) => {
    // get required data
    const { type, question, desc, options, answer, imgsrc, audios, audio } =
      req.body;
    const { _id: userId } = req.user || {};

    try {
      // check if user exists
      const user = await User.findById(userId);
      if (!user)
        return res.status(400).json({ message: "No such user exists" });

      let quizObj;
      // create quiz based on type
      if (type === "text") {
        quizObj = {
          type,
          question,
          desc,
          options,
          answer,
        };
      }

      if (type === "image") {
        quizObj = {
          type,
          question,
          desc,
          imgsrc,
          options,
          answer,
        };
      }

      if (type === "audio") {
        quizObj = {
          type,
          question,
          desc,
          options,
          audios,
          answer,
        };
      }

      if (type === "audio2text") {
        quizObj = {
          type,
          question,
          desc,
          audio,
          answer,
        };
      }

      res.send(201).json({ id: quiz._id });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
);

export default router;

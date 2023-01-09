import { Router } from "express";
import validate from "../middlewares/validator.js";
import { signupSchema, loginSchema } from "../models/validationSchema.js";
import { loginUser, signUpUser } from "../controllers/authController.js";
import { requireAuth } from "../middlewares/auth.js";
import User from "../models/user.js";

const router = Router();

router.post("/signup", validate(signupSchema), signUpUser);

router.post("/login", validate(loginSchema), loginUser);

router.put("/updateUser", requireAuth, async (req, res) => {
  const { name, email, _id, about, description } = req.body;
  const { _id: userId = "" } = req.user || {};
  if (userId != _id) {
    return res.status(401).json({ message: "Unnauthorized" });
  }
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name: name,
          email: email,
          about: about,
          description: description,
        },
      },
      { new: true }
    );
    return res.json({
      name: user.name,
      email: user.email,
      isMentor: user.isMentor,
      description: user.description,
      about: user.about,
      _id: user._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;

import User from "../models/user.js";
import { hash, compare } from "bcrypt";
import { getJWTToken } from "../middlewares/auth.js";

export const signUpUser = async (req, res) => {
  // get required data
  const { name = "", email = "", password = "" } = req.body;
  try {
    // check if user exists
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User Already exists" });

    // hash the password
    const hashedPassword = await hash(password, 10);
    // create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.json({ name, email, _id: newUser._id });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const loginUser = async (req, res) => {
  // get required data
  const { email = "", password = "" } = req.body;
  try {
    // check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "No User with this email exists" });

    // compare given password with stored password
    const isMatch = await compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    // create a token
    const jwtToken = getJWTToken({ _id: user._id });
    res.json({
      name: user.name,
      email: user.email,
      isMentor: user.isMentor,
      description: user.description,
      about: user.about,
      _id: user._id,
      token: jwtToken,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

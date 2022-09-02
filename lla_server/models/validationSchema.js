import { body } from "express-validator";

export const signupSchema = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name cannot be blank")
    .not()
    .isNumeric()
    .withMessage("Name cannot be a number"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Enter a valid email"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 6 })
    .withMessage("Password should be minimum 6 character long"),
];

export const loginSchema = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Enter a valid email"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 6 })
    .withMessage("Password should be minimum 6 character long"),
];

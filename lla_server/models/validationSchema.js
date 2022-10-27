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

// export const createQuizSchema = [
//   body("type").trim().notEmpty().withMessage("Type cannot be empty"),
//   body("question").trim().notEmpty().withMessage("question cannot be empty"),
//   body("answer").trim().notEmpty().withMessage("answer cannot be empty"),
//   body("options").custom((value, { req }) => {
//     const { type } = req.body;
//     if (type !== "audio2text") {
//       if (!value) {
//         throw new Error("options are required");
//       }
//       if (!Array.isArray(value) || value.length !== 4) {
//         throw new Error("options should be an array of length  4");
//       }
//     }
//     return true;
//   }),
//   body("audios").custom((value, { req }) => {
//     const { type } = req.body;
//     if (type === "audio") {
//       if (!value) {
//         throw new Error("audios are required");
//       }
//       if (!Array.isArray(value) || value.length !== 4) {
//         throw new Error("audios should be an array of length  4");
//       }
//     }
//     return true;
//   }),
//   body("imgsrc").custom((value, { req }) => {
//     const { type } = req.body;
//     if (type === "image") {
//       if (!value) {
//         throw new Error("imgsrc is required");
//       }
//     }
//     return true;
//   }),
// ];

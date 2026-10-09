const { body } = require("express-validator");

const createCourseValidation = [
  body("courseTitle")
    .trim()
    .notEmpty()
    .withMessage("Course title is required.")
    .isLength({ min: 5, max: 100 })
    .withMessage("Course title must be between 5 and 100 characters."),

  body("courseSubTitle")
    .trim()
    .notEmpty()
    .withMessage("Course subtitle is required.")
    .isLength({ min: 10, max: 150 })
    .withMessage("Course subtitle must be between 10 and 150 characters."),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required.")
    .isLength({ min: 30, max: 5000 })
    .withMessage("Description must be between 30 and 5000 characters."),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required."),

  body("language")
    .trim()
    .notEmpty()
    .withMessage("Language is required.")
    .isIn(["Hindi", "English"])
    .withMessage("Invalid language."),

  body("level")
    .trim()
    .notEmpty()
    .withMessage("Level is required.")
    .isIn(["Beginner", "Intermediate", "Advanced"])
    .withMessage("Invalid level."),

  body("pricing")
    .notEmpty()
    .withMessage("Pricing is required.")
    .isNumeric()
    .withMessage("Pricing must be a number.")
    .custom((value) => value >= 0)
    .withMessage("Pricing cannot be negative."),

  body("tags")
    .trim()
    .notEmpty()
    .withMessage("Tags are required."),
];

module.exports = createCourseValidation;
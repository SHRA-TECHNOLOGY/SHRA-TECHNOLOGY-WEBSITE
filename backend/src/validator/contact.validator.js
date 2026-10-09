const { body } = require("express-validator");

const acceptContactDetails = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required !"),
    
    body("email")
        .notEmpty()
        .withMessage('Email is required !')
        .isEmail()
        .withMessage("Please give me email format"),
    
    body("subject")
        .notEmpty()
        .withMessage("Subject is required !")
        .isLength({ min: 10, max: 150 })
        .withMessage("Subject must be 10 to 150 words."),
    
    body("message")
        .notEmpty()
        .withMessage("Message is required !")
        .isLength({ min: 10, max: 5000 })
        .withMessage("Subject must be 10 to 5000 words."),
]

module.exports = acceptContactDetails
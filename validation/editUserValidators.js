const { body } = require("express-validator");
const User = require("../models/User");

const editUserValidators = [
    body("username")
        .notEmpty()
        .trim()
        .isLength({ min: 4, max: 15 })
        .withMessage("Username is required and must be between 4 and 15 characters"),

    body("email")
        .notEmpty()
        .trim()
        .isEmail()
        .withMessage("Invalid email format")
        .custom(async (value) => {
            const userDoc = await User.findOne({ where: { email: value } });
            if (userDoc) {
                return Promise.reject("Email already in use");
            }
        }),

    body("contacts")
        .notEmpty()
        .isNumeric()
        .isLength({ min: 10, max: 10 })
        .withMessage("Contacts must be 10 characters long starting with 9")
]



module.exports = editUserValidators;
const { body } = require("express-validator");
const User = require("../models/User");

const createUserValidators = [
    body("username")
        .isLength({ min: 4, max: 15 })
        .withMessage("Username is required and must be between 4 and 15 characters"),

    body("email")
        .isEmail()
        .withMessage("Invalid email format")
        .custom(async (value) => {
            const userDoc = await User.findOne({ where: { email: value } });
            if (userDoc) {
                return Promise.reject("Email already in use");
            }
        }),

    body("contacts")
        .trim()
        .isLength({ min: 10, max: 10 })
        .withMessage("Contacts must be 10 characters"),

]



module.exports = createUserValidators;
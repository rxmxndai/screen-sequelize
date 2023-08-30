const { body } = require("express-validator");
const User = require("../models/User");

const editUserValidators = [
    body("username")
        .isLength({ min: 4, max: 15 })
        .optional(),

    body("email")
        .isEmail()
        .custom(async (value) => {
            const userDoc = await User.findOne({ where: { email: value } });
            if (userDoc) {
                return Promise.reject("Email already in use");
            }
        })
        .optional(),

    body("contacts")
        .trim()
        .isLength({ min: 10, max: 10 })
        .withMessage("Contacts must be 10 characters")
        .optional(),
]



module.exports = editUserValidators;
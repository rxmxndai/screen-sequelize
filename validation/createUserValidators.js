const { body } = require("express-validator");
const User = require("../models/User");

const createUserValidators = [
    body("username")
        .notEmpty()
        .trim()    
        .isLength({ min: 4, max: 15 }),

    body("email")
        .notEmpty()
        .trim()    
        .isEmail()
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
]



module.exports = createUserValidators;
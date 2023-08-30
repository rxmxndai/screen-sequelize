const { validationResult } = require("express-validator")

const validate = async (req, res, next) => {
    const errors = validationResult(req);
    // no errors -> proceed
    if (!errors.isEmpty()) {
        const errorObject = new Error("Validation failed!");
        errorObject.statusCode = 400;
        errorObject.data = errors.array().map(err => {
            return {
                [err.path]: err.msg
            }
        })
        next(errorObject);
    }
    else {
        next();
    }
}

module.exports = validate

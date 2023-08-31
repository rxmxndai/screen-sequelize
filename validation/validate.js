const { validationResult } = require("express-validator");
const customError = require("../util/customError");

const validate = async (req, res, next) => {
    const errors = validationResult(req);

    // no errors -> proceed
    if (!errors.isEmpty()) {
        let data = [];
        errors.array().forEach(err => {
            const found = data.find(existing => existing[err.path]);
            if (!found) {
                let obj = { [err.path]: err.msg }
                data.push(obj);
            }
        })

       next(new customError("Validation failed!", 400, data))
    }
    else {
        next();
    }
}

module.exports = validate

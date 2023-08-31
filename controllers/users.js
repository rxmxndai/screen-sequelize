const User = require("../models/User");
const asyncWrap = require("../util/asyncWrap");
const customError = require("../util/customError");



/* Requires username, email and contacts as string to create a new user record */
exports.createNewUser = asyncWrap(async (req, res, next) => {

    const { username, email, contacts } = req.body;

    /* create a user record */
    const user = await User.create({ username, email, contacts });
    return res.status(201).json({ message: "User record created!", user });
})







/* Returns the record of all users in array */
exports.getAllUsers = asyncWrap(async (req, res, next) => {

    const users = await User.findAll();

    if (!users ) {
        throw new customError("User records not found!", 404, []);
    }

    return res.status(200).json({ message: "Users list.", users });
})





/* 
    Requires id (userId) of an user as route params
    Returns a user details record
*/
exports.getOneUser = asyncWrap(async (req, res, next) => {

    const { userId } = req.params;

    const user = await User.findByPk(userId);

    if (!user ) {
        throw new customError("User record not found!", 404, []);
    }

    return res.status(200).json({ message: "One User record.", user });
})




/* 
    Requires id (userId) of an user as route params && json object of fields to update in body
    will return updated user record if success, else error
*/
exports.updateUser = asyncWrap(async (req, res, next) => {

    const { userId } = req.params;
    const newData = req.body;
    const validUpdates = ["email", "username", "contacts"];

    const valid = Object.keys(newData).every(field => validUpdates.includes(field));

    // update fails because of invalid fields
    if (!valid) {
        const err = new Error("Invalid Field! Update failed")
        err.status = 400;
        next(err);
    }

    // fin the specific user record
    const user = await User.findByPk(userId);
    if (!user) {
        const err = new Error("No user found!")
        err.status = 404;
        next(err);
    }

    // update with new data
    await user.update(newData)

    // return if update success
    return res.status(200).json({ message: "User data updated!", user });
})





// Requires id (userId) of an user as route params 
// will delete the user record
exports.deleteUser = asyncWrap(async (req, res, next) => {

    const { userId } = req.params;
    const user = await User.findByPk(userId);

    if (!user) {
        const err = new Error("No user found!")
        err.status = 404;
        next(err);
    }
    await user.destroy();
    return res.status(200).json({ message: "User record deleted!", user });
})
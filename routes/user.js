const router = require("express").Router();

// controllers imports
const { getAllUsers, getOneUser, createNewUser, updateUser, deleteUser } = require("../controllers/users");

// validators and validation middlewares
const createUserValidators = require("../validation/createUserValidators");
const editUserValidators = require("../validation/editUserValidators");
const validate = require("../validation/validate");


/* Create a user record */
router.post("/", createUserValidators, validate, createNewUser);

/* Update existing user record */
router.patch("/:userId", editUserValidators, validate, updateUser)

/* Get all user records */
router.get("/", getAllUsers)

/* Get One user records */
router.get("/:userId", getOneUser)

/* Delete a user record */
router.delete("/:userId", deleteUser)




module.exports = router;
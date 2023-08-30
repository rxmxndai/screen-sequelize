const { DataTypes } = require("sequelize")
const sequelize = require("../database/sequelize")


const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    contacts: {
        type: DataTypes.STRING,
        allowNull: false
    }
})


module.exports = User;
const dbConfig = require("../config/db-config")
const Sequelize = require("sequelize")

const { DATABASE, HOST, USER, PASSWORD, DIALECT,  } = dbConfig;


// connect to the db with new sequelize instance
const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST,
    dialect: DIALECT,
    // Control logging
    logging: false, 
})



module.exports = sequelize;
const express = require("express");
require("dotenv").config();
// routes import
const userRoutes = require("./routes/user");
// database connection
const sequelize = require("./database/sequelize");
// use global error handler
const globalErrorHandler = require("./util/errorHandler");



const app = express();

// app configs
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// routes usage
app.use("/api/users", userRoutes);


// Catch-all middleware at the end
app.use(globalErrorHandler);


sequelize
.sync()
// .sync({force: true})
    .then(async () => {
        console.log("------------------------- Database connected ------------------------- ")
        app.listen(process.env.PORT, () => {
            console.log("App live at port:", process.env.PORT);
        });
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });






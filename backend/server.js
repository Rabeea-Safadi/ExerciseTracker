const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

// Creating express app and makin
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connection to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

const exerciseRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exerciseRouter);
app.use("/users", usersRouter);

// Setting the server to listen on a port set on the .env file
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
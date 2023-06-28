import express from "express";
import colors from "colors";
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoute from "./Routes/authRoute.js"
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// const bodyParser = require("body-parser");
// const ejs = require("ejs");
// const _ =require("lodash");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use("/api/v1/auth", authRoute)
app.use(express.static(join(__dirname, '..', 'Home')));
app.use(express.static(join(__dirname, '..', 'Components')));
// app.use(express.static("../Login"));

app.get("/", function (req, res) {
    // res.status(200).send("<h1>HI this is the homepage</h1>")
    res.sendFile(join(__dirname, '..', 'index.html'));
});

app.get("/hi", (req, res) => {
    res.send("<h1>Seems like this is working.</h1>")
    console.log("hi url is working.");
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
    console.log(`Server started ${process.env.mode}on port ${PORT}`);
});

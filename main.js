const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
//const errorMiddleware = require('./middlewares/error');

const app = express();
require('dotenv').config()
const db = require('./config/database');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const user = require('./routes/user');
app.use(user);

//--- DB -----
global.db = db;
// set the app to listen on the port
const server = app.listen(PORT, () => {
    console.log(`Server running on ${process.env.APP_URL}/${process.env.PORT}`)
});

// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});

// UncaughtException Error
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
});


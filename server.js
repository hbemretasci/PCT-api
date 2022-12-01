const express = require('express');
const dotenv = require('dotenv');
const routers = require('./routers/index');
const connectDatabase = require('./helpers/database/connectDatabase');
const customErrorHandler = require('./middlewares/errors/customErrorHandler');

// Environment Variables
dotenv.config({
    path: "./config/env/config.env"
});

// MongoDb Connection
connectDatabase();

const app = express();

//Express - Body Middleware
app.use(express.json());

const PORT = process.env.PORT;

//Routers Middleware
app.use("/api", routers);

//Error Handling
app.use(customErrorHandler);

app.listen(PORT, () => {
    console.log(`App started on ${PORT} : ${process.env.NODE_ENV}`)
});


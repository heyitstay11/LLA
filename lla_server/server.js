import express from "express";
import cors from 'cors';
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import connectDB from './middlewares/connectDB.js';
import apiRouter from './routes/index.js';
dotenv.config();
const PORT = process.env.PORT || 5000;
const whiteList = process.env.WHITELISTED_DOMAINS ?
    process.env.WHITELISTED_DOMAINS.split(',') : [];


const app = express();

connectDB(); // connect to database
app.use(morgan('dev')); // Set up dev logger
app.use(cors({ origin: whiteList, credentials: true })); // set Cross Origin Request Rules 
app.use(express.urlencoded({ extended: true })); // accept text encoded data
app.use(express.json()); // accept json data
app.use(cookieParser(process.env.COOKIE_SECRET)); // setup signed cookies

// check server
app.get('/', (_, res) => {    
    res.send('Hello from server');
})

// forward /api request to apiRouter
app.use('/api', apiRouter);

app.listen(PORT, () => console.log(`Server at ${PORT}`));
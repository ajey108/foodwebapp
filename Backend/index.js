import express from "express";
import {config} from "dotenv";
import mongoose from "mongoose";
import foodRoute from "./routes/foodRoute.js";
import { authRouter } from "./controllers/authController.js";
import { auth } from "./middleware/authMiddleware.js";
import cors from "cors";
import User from "./models/userModel.js";


config();

const app = express();

app.use(cors());

app.listen(process.env.PORT,()=> console.log(`liste on ${process.env.PORT} PORT`));

mongoose
.connect(process.env.mongodb)
.then(()=>console.log(`Database is connected`))
.catch((error)=> console.log(error));

app.use(express.json());
app.use('/food',foodRoute);

app.use(cors());

app.use('/auth',authRouter);

app.use(auth);


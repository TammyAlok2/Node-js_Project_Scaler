//require('dotenv').config({path:'./env'})
import dotenv from 'dotenv'
import express from 'express'

import mongoose from "mongoose";

import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

import {app} from './app.js'

dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
app.listen(process.env.PORT||3000,()=>{
  console.log(`server is running on port : ${process.env.PORT}`)
})

})
.catch((err)=>{
console.log("mongo db connnected failed !!! ",err);

})
app.get('/', (req, res) => {
  res.send('hello world')
})






























/*import express from "express";
const app = express();

//iife

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error ", () => {
      console.log("ERRR :", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("ERROR", error);
    throw error;
  }
})();
*/
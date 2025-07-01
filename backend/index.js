import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary';
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

dotenv.config();
const app = express()
const port=process.env.PORT || 3000;
const mongo_url=process.env.MongoUri;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
  methods:["GET","POST","PUT","DELETE"]
}));

// file upload logic
app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:"/tmp/"
}))

//connect mongoDb
try{
  mongoose.connect(mongo_url)
  console.log("connected to database")
  console.log(mongo_url)
}catch(error){
  console.log("Error",error)
}

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use('/user',userRoute)
app.use('/blog',blogRoute)

//CLOUDANIRY CONFIG
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key:  process.env.CLOUD_API_KEY, 
  api_secret:  process.env.CLOUD_SECRET_KEY // Click 'View API Keys' above to copy your API secret
});

app.listen(port,()=>{
    console.log("App is listening on port",port)
})
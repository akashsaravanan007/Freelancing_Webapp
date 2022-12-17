import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
// http://localhost:5001/api/user/logon
app.use("/api/user",router);
app.use("/api/blog", blogRouter); 
mongoose
  .connect(
    "mongodb+srv://akash:akash123@mern-apps.dgtsqdb.mongodb.net/Freelancingwebapp?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5001))
  .then(() => console.log("Connected to DB")
  )
  .catch((err)=>console.log(err));

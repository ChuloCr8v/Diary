import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const port = 8000;

//MiddleWares
dotenv.config();
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors());

//mongodb connection

const connectToMongoose = () => {
  mongoose
    .connect(`${process.env.MONGO_URL}`)
    .then(() => console.log("Connection to DB Successful"))
    .catch((e) => console.log(e));
};

//import routes
import auth from "./routes/auth.js";
import todo from "./routes/Todo.js";
import { verifyToken } from "./verifyToken.js";

//use routes
app.use("/api/auth/", auth);
app.use("/api/todo/", todo);

app.get("/", verifyToken, (req, res) => {
  res.status(200).json("Welcome Home");
});

app.listen(port, () => {
  connectToMongoose();
  console.log(`server is listening on port ${port}`);
});

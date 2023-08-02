import express from "express";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import dotenv from "dotenv";
import { ErrorMiddleWare } from "./middleware/error.js";
import userRouter from "./routes/userRoutes.js"
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use("*",cors({
  origin:true,
  credentials : true
}))
app.use(express.json());


app.get("/", (req, res) => {
  res.status(200).json({ message: "task-1 s2win" });
});

app.use("/api/user",userRouter);

app.use(ErrorMiddleWare);


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
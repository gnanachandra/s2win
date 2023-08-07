import express from "express";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import dotenv from "dotenv";
import { ErrorMiddleWare } from "./middleware/error.js";
import userRouter from "./routes/userRoutes.js"
import { dirname, join} from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use("*",cors({
  origin:true,
  credentials : true
}))
app.use(express.json());
app.use(express.static(join(__dirname,'dist/')));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname,'dist/index.html'));
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
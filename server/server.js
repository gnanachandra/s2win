import express from "express";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import dotenv from "dotenv";
import { ErrorMiddleWare } from "./middleware/error.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import authRouter from "./routes/auth.routes.js";
import clientRouter from "./routes/client.routes.js";
import branchRouter from "./routes/branch.routes.js";
import paymentRouter from "./routes/payment.routes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(join(__dirname, "dist/")));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "dist/index.html"));
});

app.use("/api/auth", authRouter);
app.use("/api/client", clientRouter);
app.use("/api/branch", branchRouter);
app.use("/api/payment", paymentRouter);

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

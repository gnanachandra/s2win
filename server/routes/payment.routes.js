import express from "express";
import { addPayment, deletePayment } from "../controllers/payment.controller.js";
const router = express.Router();

router.route("/").post(addPayment);
router.route("/:id").delete(deletePayment);
export default router;

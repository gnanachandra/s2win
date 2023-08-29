import express from "express";
import { addPayment, deletePayment, getAllPayments } from "../controllers/payment.controller.js";
const router = express.Router();

router.route("/").post(addPayment).get(getAllPayments);
router.route("/:id").delete(deletePayment);
export default router;

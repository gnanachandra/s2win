import express from "express";
import { addPayment, deletePayment, getAllPayments, getPayment } from "../controllers/payment.controller.js";
const router = express.Router();

router.route("/all").post(addPayment).get(getAllPayments);
router.route("/:id").get(getPayment).delete(deletePayment);
export default router;

import express from "express";
import {
  addBranch,
  addClient,
  addPayment,
  deleteBranch,
  deleteClient,
  deletePayment,
  getBranch,
  getBranches,
  getClient,
  getClients,
  getPayments,
  updateBranch,
} from "../controllers/userControllers.js";
const router = express.Router();

router.route("/clients").get(getClients).post(addClient);
router.route("/clients/:id").delete(deleteClient).get(getClient);

router.route("/branches").post(addBranch);
router.route("/clients/branches/:clientId").get(getBranches)
router.route("/branches/:branchId").get(getBranch)
router.route("/branches/:branchId").patch(updateBranch).delete(deleteBranch);


router.route("/payments/:id").get(getPayments).delete(deletePayment);
router.route("/payments").post(addPayment);

export default router;
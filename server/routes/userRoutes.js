import express from "express";
import {
  addBranch,
  addClient,
  addPayment,
  addUser,
  deleteBranch,
  deleteClient,
  deletePayment,
  getBranch,
  getBranches,
  getClient,
  getClients,
  getPayments,
  login,
  updateBranch,
} from "../controllers/userControllers.js";
import { isAuthenticated } from "../middleware/verifyJWT.js";
const router = express.Router();

router.route("/login").post(login)
router.route('/users').post(addUser);
router.use(isAuthenticated)
router.route("/clients").get(getClients).post(addClient);
router.route("/clients/:id").delete(deleteClient).get(getClient);

router.route("/branches").post(addBranch);
router.route("/clients/branches/:clientId").get(getBranches)
router.route("/branches/:branchId").get(getBranch)
router.route("/branches/:branchId").patch(updateBranch).delete(deleteBranch);


router.route("/payments/:id").get(getPayments).delete(deletePayment);
router.route("/payments").post(addPayment);

export default router;
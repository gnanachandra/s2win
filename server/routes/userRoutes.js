import express from "express";
import {
  addBranch,
  addClient,
  deleteBranch,
  deleteClient,
  getClient,
  getClients,
  updateBranch,
} from "../controllers/userControllers.js";
const router = express.Router();

router.route("/clients").get(getClients).post(addClient);
router.route("/clients/:id").delete(deleteClient).get(getClient);

router.route("/branches").post(addBranch);
router.route("/branches/:id").patch(updateBranch).delete(deleteBranch);

export default router;
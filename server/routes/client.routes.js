import express from "express";
const router = express.Router();
import {
  addClient,
  deleteClient,
  getClient,
  getClients,
  updateClient,
} from "../controllers/client.controller.js";

router.route("/").get(getClients).post(addClient);
router.route("/:id").get(getClient).delete(deleteClient).patch(updateClient);

export default router;
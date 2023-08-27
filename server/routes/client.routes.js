import express from "express";
const router = express.Router();
import {
  addClient,
  deleteClient,
  getClient,
  getClients,
} from "../controllers/client.controller.js";

router.route("/").get(getClients).post(addClient);
router.route("/:id").get(getClient).delete(deleteClient);

export default router;
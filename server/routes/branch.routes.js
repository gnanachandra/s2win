import express from "express";
import { addBranch, deleteBranch, getBranch, updateBranch } from "../controllers/branch.controller.js";
const router = express.Router();

router.route('/').post(addBranch);
router.route('/:id').get(getBranch).delete(deleteBranch).patch(updateBranch);

export default router;
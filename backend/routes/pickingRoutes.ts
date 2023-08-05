import express from "express";
import {
	checkPickingStatus,
	getProductToPick,
	pickProduct,
	startOrderPicking,
} from "../controllers/pickingControllet";

export const router = express.Router();

router.post("/start", startOrderPicking);
router.post("/check-status", checkPickingStatus);
router.route("/pick").get(getProductToPick).post(pickProduct);

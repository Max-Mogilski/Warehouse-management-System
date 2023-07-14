import express from "express";
import {
	createPallet,
	getPalletProducts,
} from "../controllers/palletController";

export const router = express.Router();

router.route("/").post(createPallet);
router.get("/:id/products", getPalletProducts);

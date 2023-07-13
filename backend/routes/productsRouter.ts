import express from "express";
import {
	createProduct,
	getAllProducts,
	getSingleProduct,
	refillProduct,
	relocateProduct,
} from "../controllers/productsController";
import { authenticateUser } from "../middleware/authentication";

export const router = express.Router();

router.route("/").get(getAllProducts).post(authenticateUser, createProduct);
router.route("/:id").get(getSingleProduct);
router.post("/refill", authenticateUser, refillProduct);
router.post("/relocate", authenticateUser, relocateProduct);

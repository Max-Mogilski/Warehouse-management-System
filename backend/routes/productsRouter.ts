import express from "express";
import {
	createProduct,
	getAllProducts,
	getSigleProduct,
} from "../controllers/productsController";
import { authenticateUser } from "../middleware/authentication";

export const router = express.Router();

router.route("/").get(getAllProducts).post(authenticateUser, createProduct);
router.route("/:id").get(getSigleProduct);

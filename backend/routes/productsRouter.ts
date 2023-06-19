import express from "express";
import {
	createProduct,
	getAllProducts,
	getSigleProduct,
} from "../controllers/productsController";

export const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);
router.route("/:id").get(getSigleProduct);

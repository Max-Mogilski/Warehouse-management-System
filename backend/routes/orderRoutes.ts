import express from "express";
import {
	createOrder,
	getAllOrders,
	getOrder,
	getOrderProducts,
} from "../controllers/orderController";
import { authenticateUser } from "../middleware/authentication";

export const router = express.Router();

router.route("/").post(createOrder).get(authenticateUser, getAllOrders);
router.route("/:id").get(authenticateUser, getOrder);
router.get("/:id/products", authenticateUser, getOrderProducts);

import express from "express";
import { createOrder, getAllOrders } from "../controllers/orderController";
import { authenticateUser } from "../middleware/authentication";

export const router = express.Router();

router.route("/").post(createOrder).get(authenticateUser, getAllOrders);

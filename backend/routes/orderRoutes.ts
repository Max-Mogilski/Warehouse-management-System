import express from "express";
import { createOrder } from "../controllers/orderController";

export const router = express.Router();

router.post("/", createOrder);

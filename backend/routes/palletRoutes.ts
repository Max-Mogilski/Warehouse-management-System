import express from "express";
import { createPallet } from "../controllers/palletController";

export const router = express.Router();

router.route("/").post(createPallet);

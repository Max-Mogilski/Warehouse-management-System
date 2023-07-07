import express from "express";
import { createLocation } from "../controllers/locationController";

export const router = express.Router();

router.post("/", createLocation);

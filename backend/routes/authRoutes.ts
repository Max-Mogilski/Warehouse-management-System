import express from "express";
import {
	currentUser,
	login,
	logout,
	register,
} from "../controllers/authController";
import { authenticateUser } from "../middleware/authentication";

export const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.delete("/logout", authenticateUser, logout);
router.get("/current-user", authenticateUser, currentUser);

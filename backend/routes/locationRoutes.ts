import express from "express";
import {
	createLocation,
	getAllLocations,
	getLocation,
} from "../controllers/locationController";

export const router = express.Router();

router.route("/").post(createLocation).get(getAllLocations);
router.route("/:id").get(getLocation);

import express from "express";

// error middlewares
import notFoundMiddleware from "../middleware/not-found";
import errorHandlerMiddleware from "../middleware/error-handler";
import CustomAPIError from "../errors/custom-api";

const router = express.Router();

// Import routes

// routes

router.use(notFoundMiddleware);
router.use(errorHandlerMiddleware);

// Export the router
export default router;

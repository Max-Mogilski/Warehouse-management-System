import express from "express";

// error middlewares
import notFoundMiddleware from "../middleware/not-found";
import errorHandlerMiddleware from "../middleware/error-handler";

// import routes
import { router as productRouter } from "./productsRouter";

const router = express.Router();

// routes
router.use("/products", productRouter);

router.use(notFoundMiddleware);
router.use(errorHandlerMiddleware);

// Export the router
export default router;

import express, { Response, Request } from "express";

// error middlewares
import notFoundMiddleware from "../middleware/not-found";
import errorHandlerMiddleware from "../middleware/error-handler";

// import routes
import { router as productRouter } from "./productsRouter";
import { router as authRouter } from "./authRoutes";
import { router as orderRouter } from "./orderRoutes";

const router = express.Router();

// routes
router.use("/products", productRouter);
router.use("/auth", authRouter);
router.use("/orders", orderRouter);

router.use(notFoundMiddleware);
router.use(errorHandlerMiddleware);

export default router;

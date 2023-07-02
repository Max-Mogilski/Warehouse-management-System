import express, { Response, Request } from "express";

// error middlewares
import notFoundMiddleware from "../middleware/not-found";
import errorHandlerMiddleware from "../middleware/error-handler";

// import routes
import { router as productRouter } from "./productsRouter";
import { router as authRouter } from "./authRoutes";
import { router as orderRouter } from "./orderRoutes";
import { authenticateUser } from "../middleware/authentication";

const router = express.Router();

// routes
router.use("/products", productRouter);
router.use("/orders", orderRouter);
router.use("/auth", authRouter);
router.get("/test", authenticateUser, (req: Request, res: Response) => {
	return res.send("Siema");
});

router.use(notFoundMiddleware);
router.use(errorHandlerMiddleware);

export default router;

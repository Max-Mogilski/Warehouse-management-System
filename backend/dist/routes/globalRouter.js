"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// error middlewares
const not_found_1 = __importDefault(require("../middleware/not-found"));
const error_handler_1 = __importDefault(require("../middleware/error-handler"));
// import routes
const productsRouter_1 = require("./productsRouter");
const authRoutes_1 = require("./authRoutes");
const orderRoutes_1 = require("./orderRoutes");
const locationRoutes_1 = require("./locationRoutes");
const palletRoutes_1 = require("./palletRoutes");
const pickingRoutes_1 = require("./pickingRoutes");
const authentication_1 = require("../middleware/authentication");
const router = express_1.default.Router();
// routes
router.use("/products", productsRouter_1.router);
router.use("/auth", authRoutes_1.router);
router.use("/orders", orderRoutes_1.router);
router.use("/locations", authentication_1.authenticateUser, locationRoutes_1.router);
router.use("/pallets", authentication_1.authenticateUser, palletRoutes_1.router);
router.use("/order-picking", authentication_1.authenticateUser, pickingRoutes_1.router);
router.use(not_found_1.default);
router.use(error_handler_1.default);
exports.default = router;

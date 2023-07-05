"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const authentication_1 = require("../middleware/authentication");
exports.router = express_1.default.Router();
exports.router.route("/").post(orderController_1.createOrder).get(authentication_1.authenticateUser, orderController_1.getAllOrders);

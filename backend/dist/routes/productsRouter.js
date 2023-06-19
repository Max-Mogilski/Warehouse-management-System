"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const productsController_1 = require("../controllers/productsController");
exports.router = express_1.default.Router();
exports.router.route("/").get(productsController_1.getAllProducts).post(productsController_1.createProduct);
exports.router.route("/:id").get(productsController_1.getSigleProduct);

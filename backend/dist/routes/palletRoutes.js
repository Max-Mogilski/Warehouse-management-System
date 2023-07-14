"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const palletController_1 = require("../controllers/palletController");
exports.router = express_1.default.Router();
exports.router.route("/").post(palletController_1.createPallet);
exports.router.get("/:id/products", palletController_1.getPalletProducts);

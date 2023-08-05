"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const pickingControllet_1 = require("../controllers/pickingControllet");
exports.router = express_1.default.Router();
exports.router.post("/start", pickingControllet_1.startOrderPicking);
exports.router.get("/check-status", pickingControllet_1.checkPickingStatus);
exports.router.route("/pick").get(pickingControllet_1.getProductToPick).post(pickingControllet_1.pickProduct);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkStockQuantity = void 0;
const conflict_1 = __importDefault(require("../../errors/conflict"));
const checkStockQuantity = (productsDB, products) => {
    const stock = {};
    for (const product in productsDB) {
        stock[productsDB[product].id] = productsDB[product].quantity;
    }
    for (let i = 0; i < products.length; i++) {
        if (stock[products[i].id] < products[i].quantity) {
            throw new conflict_1.default("Insufficient stock quantity");
        }
    }
};
exports.checkStockQuantity = checkStockQuantity;

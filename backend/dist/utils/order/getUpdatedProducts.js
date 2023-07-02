"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpdatedProducts = void 0;
const getUpdatedProducts = (productsDB, products) => {
    const updatedStock = {};
    for (const product in productsDB) {
        updatedStock[productsDB[product].id] = productsDB[product]
            .quantity;
    }
    for (const product in products) {
        updatedStock[products[product].id] = (updatedStock[products[product].id] -
            products[product].quantity);
    }
    for (const product in productsDB) {
        productsDB[product].quantity = updatedStock[productsDB[product].id];
    }
    return productsDB;
};
exports.getUpdatedProducts = getUpdatedProducts;

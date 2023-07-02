"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalOrderPrice = void 0;
const getTotalOrderPrice = (productsDB, products) => {
    const productsList = {};
    for (const product in productsDB) {
        productsList[productsDB[product].id] = {
            price: productsDB[product].price,
            quantity: 0,
        };
    }
    for (const product in products) {
        productsList[products[product].id].quantity = products[product].quantity;
    }
    let totalPrice = 0;
    for (const product in productsList) {
        totalPrice += productsList[product].price * productsList[product].quantity;
    }
    return totalPrice;
};
exports.getTotalOrderPrice = getTotalOrderPrice;

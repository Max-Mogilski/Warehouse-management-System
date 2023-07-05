"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreparedOrderProducts = void 0;
const getPreparedOrderProducts = (orderProducts, products) => {
    const preparedObj = {};
    for (const product in orderProducts) {
        preparedObj[orderProducts[product].productId] = {
            productId: orderProducts[product].productId,
            quantity: orderProducts[product].quantity,
        };
    }
    for (const product in products) {
        preparedObj[products[product].id] = Object.assign(Object.assign({}, preparedObj[products[product].id]), { name: products[product].name, price: products[product].price });
    }
    return Object.keys(preparedObj).map((key) => preparedObj[key]);
};
exports.getPreparedOrderProducts = getPreparedOrderProducts;

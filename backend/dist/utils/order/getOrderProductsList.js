"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderProductsList = void 0;
const getOrderProductsList = (products) => {
    return products.map((product) => {
        return {
            quantity: product.quantity,
            product: {
                connect: { id: product.id },
            },
        };
    });
};
exports.getOrderProductsList = getOrderProductsList;

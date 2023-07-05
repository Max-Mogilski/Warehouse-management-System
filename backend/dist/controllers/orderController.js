"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderProducts = exports.getOrder = exports.getAllOrders = exports.createOrder = void 0;
const prisma_1 = require("../prisma/prisma");
const getTotalPrice_1 = require("../utils/order/getTotalPrice");
const checkQuantity_1 = require("../utils/order/checkQuantity");
const statuses_1 = require("../utils/order/enum/statuses");
const http_status_codes_1 = require("http-status-codes");
const getOrderProductsList_1 = require("../utils/order/getOrderProductsList");
const getUpdatedProducts_1 = require("../utils/order/getUpdatedProducts");
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address: street, city, postcode, email, fullName, products, } = req.body;
    if (!street ||
        !city ||
        !postcode ||
        !email ||
        !fullName ||
        !products ||
        products.length === 0 ||
        !products[0].id ||
        !products[0].quantity) {
        throw new bad_request_1.default("Please provide all values!");
    }
    const productsToFind = products.map((product) => product.id);
    const productsData = yield prisma_1.prisma.product.findMany({
        where: {
            id: { in: productsToFind },
        },
    });
    if (!productsData || productsData.length === 0) {
        throw new bad_request_1.default("Product doesn't exist");
    }
    (0, checkQuantity_1.checkStockQuantity)(productsData, products);
    const totalPrice = (0, getTotalPrice_1.getTotalOrderPrice)(productsData, products);
    const orderProductsList = (0, getOrderProductsList_1.getOrderProductsList)(products);
    const address = `${street}, ${city}, ${postcode}`;
    const order = yield prisma_1.prisma.order.create({
        data: {
            status: statuses_1.Statuses.CREATED,
            address,
            customer: fullName,
            customerEmail: email,
            totalPrice: totalPrice,
            orderProducts: {
                create: orderProductsList,
            },
        },
    });
    const updatedProducts = (0, getUpdatedProducts_1.getUpdatedProducts)(productsData, products);
    updatedProducts.map((product) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, quantity } = product;
        yield prisma_1.prisma.product.update({ where: { id }, data: { quantity } });
    }));
    res.status(http_status_codes_1.StatusCodes.OK).json(order);
});
exports.createOrder = createOrder;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ordersList = yield prisma_1.prisma.order.findMany({
        select: {
            id: true,
            status: true,
        },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ data: ordersList });
});
exports.getAllOrders = getAllOrders;
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const order = yield prisma_1.prisma.order.findFirst({
        where: {
            id: orderId,
        },
    });
    if (!order) {
        throw new bad_request_1.default(`Order with id ${orderId} doesn't exists!`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ data: order });
});
exports.getOrder = getOrder;
const getOrderProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const orderProducts = yield prisma_1.prisma.orderProduct.findMany({
        where: {
            orderId,
        },
        include: {
            product: true,
        },
    });
    if (!orderProducts || orderProducts.length === 0) {
        throw new bad_request_1.default(`Order with id ${orderId} doesn't have any products!`);
    }
    const products = orderProducts.map((orderProduct) => ({
        productId: orderProduct.productId,
        quantity: orderProduct.quantity,
        name: orderProduct.product.name,
        price: orderProduct.product.price,
    }));
    res.status(http_status_codes_1.StatusCodes.OK).json({ data: products });
});
exports.getOrderProducts = getOrderProducts;

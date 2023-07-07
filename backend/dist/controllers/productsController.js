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
exports.createProduct = exports.getSigleProduct = exports.getAllProducts = exports.prisma = void 0;
const http_status_codes_1 = require("http-status-codes");
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield exports.prisma.product.findMany({
        select: {
            id: true,
            name: true,
            price: true,
            url: true,
            quantity: true,
        },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ data: products });
});
exports.getAllProducts = getAllProducts;
const getSigleProduct = (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).json({ product: {} });
};
exports.getSigleProduct = getSigleProduct;
// JUST TO AVOID CREATING PRODUCTS MANUALLY - TESTING PURPOSE
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, url } = req.body;
    let { quantity } = req.body;
    if (!quantity) {
        quantity = 0;
    }
    if (!name || !price || !url) {
        throw new bad_request_1.default("Please provide product all fields");
    }
    const product = yield exports.prisma.product.create({
        data: Object.assign(Object.assign({}, req.body), { quantityStock: quantity }),
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ data: product });
});
exports.createProduct = createProduct;

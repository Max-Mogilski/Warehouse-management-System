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
exports.refillProduct = exports.createProduct = exports.getSingleProduct = exports.getAllProducts = exports.prisma = void 0;
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
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const product = yield exports.prisma.product.findFirst({
        where: {
            id: productId,
        },
    });
    if (!product) {
        throw new bad_request_1.default(`Order with id ${productId} doesn't exists!`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ data: product });
});
exports.getSingleProduct = getSingleProduct;
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
const refillProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, productQuantity, palletId } = req.body;
    if (!productId || !productQuantity || !palletId)
        throw new bad_request_1.default("Please provide all required values!");
    const product = yield exports.prisma.product.findUnique({ where: { id: productId } });
    if (!product)
        throw new bad_request_1.default(`Product with id ${productId} doesn't exists!`);
    const pallet = yield exports.prisma.pallet.findUnique({ where: { id: palletId } });
    if (!pallet)
        throw new bad_request_1.default(`Pallet with id ${palletId} doesn't exists!`);
    const palletProduct = yield exports.prisma.palletProduct.findFirst({
        where: {
            productId,
            palletId,
        },
    });
    if (palletProduct) {
        yield exports.prisma.palletProduct.update({
            where: { id: palletProduct.id },
            data: { quantity: palletProduct.quantity + productQuantity },
        });
    }
    else {
        yield exports.prisma.palletProduct.create({
            data: {
                palletId: pallet.id,
                productId: product.id,
                quantity: productQuantity,
            },
        });
    }
    yield exports.prisma.product.update({
        where: { id: productId },
        data: {
            quantity: product.quantity + productQuantity,
            quantityStock: product.quantityStock + productQuantity,
        },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "ok" });
});
exports.refillProduct = refillProduct;

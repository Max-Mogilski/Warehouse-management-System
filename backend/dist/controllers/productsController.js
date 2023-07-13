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
exports.relocateProduct = exports.refillProduct = exports.createProduct = exports.getSingleProduct = exports.getAllProducts = exports.prisma = void 0;
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
    if (productQuantity < 1) {
        throw new bad_request_1.default("Quantity can't be smaller than 1");
    }
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
const relocateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, productQuantity, currentPalletId, destinationPalletId } = req.body;
    if (!productId ||
        !productQuantity ||
        !currentPalletId ||
        !destinationPalletId)
        throw new bad_request_1.default("Please provide all required values!");
    if (currentPalletId === destinationPalletId) {
        throw new bad_request_1.default("Please provide a different destination pallet!");
    }
    if (productQuantity < 1) {
        throw new bad_request_1.default("Quantity can't be smaller than 1");
    }
    const currentPalletProduct = yield exports.prisma.palletProduct.findFirst({
        where: {
            productId,
            palletId: currentPalletId,
        },
    });
    if (!currentPalletProduct)
        throw new bad_request_1.default("The provided pallet/product doesn't exist or pallet doesn't contain the provided product");
    const destinationPalletProduct = yield exports.prisma.palletProduct.findFirst({
        where: {
            productId,
            palletId: destinationPalletId,
        },
    });
    const destinationPallet = yield exports.prisma.pallet.findFirst({
        where: { id: destinationPalletId },
    });
    if (!destinationPallet)
        throw new bad_request_1.default(`Provided destination pallet with ID: ${destinationPalletId} doesn't exist!`);
    if ((currentPalletProduct === null || currentPalletProduct === void 0 ? void 0 : currentPalletProduct.quantity) - +productQuantity < 0) {
        throw new bad_request_1.default(`Pallet with ID: ${currentPalletId} doesn't contain enough products!`);
    }
    if ((currentPalletProduct === null || currentPalletProduct === void 0 ? void 0 : currentPalletProduct.quantity) - +productQuantity === 0) {
        if (destinationPalletProduct) {
            yield exports.prisma.palletProduct.delete({
                where: {
                    id: currentPalletProduct === null || currentPalletProduct === void 0 ? void 0 : currentPalletProduct.id,
                },
            });
            yield exports.prisma.palletProduct.update({
                where: { id: destinationPalletProduct.id },
                data: { quantity: destinationPalletProduct.quantity + productQuantity },
            });
        }
        else {
            yield exports.prisma.palletProduct.update({
                where: {
                    id: currentPalletProduct === null || currentPalletProduct === void 0 ? void 0 : currentPalletProduct.id,
                },
                data: {
                    palletId: destinationPalletId,
                },
            });
        }
    }
    else {
        yield exports.prisma.palletProduct.update({
            where: { id: currentPalletProduct === null || currentPalletProduct === void 0 ? void 0 : currentPalletProduct.id },
            data: {
                quantity: (currentPalletProduct === null || currentPalletProduct === void 0 ? void 0 : currentPalletProduct.quantity) - productQuantity,
            },
        });
        if (destinationPalletProduct) {
            yield exports.prisma.palletProduct.update({
                where: { id: destinationPalletProduct === null || destinationPalletProduct === void 0 ? void 0 : destinationPalletProduct.id },
                data: {
                    quantity: (destinationPalletProduct === null || destinationPalletProduct === void 0 ? void 0 : destinationPalletProduct.quantity) + productQuantity,
                },
            });
        }
        else {
            yield exports.prisma.palletProduct.create({
                data: {
                    productId,
                    quantity: productQuantity,
                    palletId: destinationPalletId,
                },
            });
        }
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "ok" });
});
exports.relocateProduct = relocateProduct;

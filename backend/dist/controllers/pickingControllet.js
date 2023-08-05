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
exports.pickProduct = exports.getProductToPick = exports.checkPickingStatus = exports.startOrderPicking = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = require("../prisma/prisma");
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const conflict_1 = __importDefault(require("../errors/conflict"));
const startOrderPicking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const currentTask = yield prisma_1.prisma.order.findFirst({
        where: {
            status: "PICKING",
            userId: user.userId,
        },
        select: { status: true, id: true },
    });
    if (currentTask) {
        throw new conflict_1.default("You already have assigned task!");
    }
    const order = yield prisma_1.prisma.order.findFirst({
        where: { userId: null },
        orderBy: {
            createdAt: "asc",
        },
    });
    if (!order) {
        throw new bad_request_1.default(`There are no orders to assign!`);
    }
    yield prisma_1.prisma.order.update({
        where: {
            id: order.id,
        },
        data: {
            userId: user.userId,
            status: "PICKING",
        },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ data: order });
});
exports.startOrderPicking = startOrderPicking;
const checkPickingStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const currentTask = yield prisma_1.prisma.order.findFirst({
        where: {
            status: "PICKING",
            userId: user.userId,
        },
        select: { status: true, id: true },
    });
    if (currentTask) {
        res.status(http_status_codes_1.StatusCodes.OK).json({ data: currentTask });
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ data: null });
});
exports.checkPickingStatus = checkPickingStatus;
const getProductToPick = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const currentTask = yield prisma_1.prisma.order.findFirst({
        where: {
            status: "PICKING",
            userId: user.userId,
        },
        select: { status: true, id: true },
    });
    if (!currentTask) {
        throw new bad_request_1.default("No task assigned!");
    }
    const product = yield prisma_1.prisma.orderProduct.findFirst({
        where: { orderId: currentTask.id, picked: false },
        select: {
            quantity: true,
            productId: true,
            orderId: true,
            picked: true,
            product: {
                select: { locations: true },
            },
        },
    });
    // order picked
    if (!product) {
        res.status(http_status_codes_1.StatusCodes.OK).json({ data: null });
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ data: product });
});
exports.getProductToPick = getProductToPick;
const pickProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { productId, quantity } = req.body;
    const user = req.user;
    if (!productId || !quantity) {
        throw new bad_request_1.default("Please provide product ID and quantity!");
    }
    const product = yield prisma_1.prisma.product.findFirst({
        where: {
            id: productId,
        },
    });
    if ((product === null || product === void 0 ? void 0 : product.quantityStock) < quantity) {
        throw new conflict_1.default("Not enough quantity of given item!");
    }
    const orderProductsData = yield prisma_1.prisma.order.findFirst({
        where: { status: "PICKING", userId: user.userId },
        select: {
            id: true,
            orderProducts: {
                where: {
                    productId,
                    picked: false,
                },
            },
        },
    });
    if (!(orderProductsData === null || orderProductsData === void 0 ? void 0 : orderProductsData.orderProducts[0])) {
        throw new bad_request_1.default("Invalid product provided!");
    }
    if ((orderProductsData === null || orderProductsData === void 0 ? void 0 : orderProductsData.orderProducts[0].quantity) !== quantity) {
        throw new bad_request_1.default("Invalid quantity provided!");
    }
    // update stock quantity
    yield prisma_1.prisma.product.update({
        where: {
            id: productId,
        },
        data: {
            quantityStock: (product === null || product === void 0 ? void 0 : product.quantityStock) - quantity,
        },
    });
    // update location
    const productLocation = (_a = product === null || product === void 0 ? void 0 : product.locations) === null || _a === void 0 ? void 0 : _a[0];
    const palletId = yield prisma_1.prisma.location.findFirst({
        where: {
            locationNo: +productLocation,
        },
        select: {
            pallet: {
                select: {
                    id: true,
                },
            },
        },
    });
    const productPallet = yield prisma_1.prisma.palletProduct.findFirst({
        where: {
            palletId: (_b = palletId === null || palletId === void 0 ? void 0 : palletId.pallet) === null || _b === void 0 ? void 0 : _b.id,
            productId,
        },
    });
    if ((productPallet === null || productPallet === void 0 ? void 0 : productPallet.quantity) < quantity) {
        throw new conflict_1.default("Not enough quatity of the provided product!");
    }
    else if ((productPallet === null || productPallet === void 0 ? void 0 : productPallet.quantity) - quantity === 0) {
        yield prisma_1.prisma.palletProduct.delete({
            where: {
                id: productPallet === null || productPallet === void 0 ? void 0 : productPallet.id,
            },
        });
        const updatedLocations = ((_c = product === null || product === void 0 ? void 0 : product.locations) === null || _c === void 0 ? void 0 : _c.length) === 1
            ? ""
            : (_d = product === null || product === void 0 ? void 0 : product.locations) === null || _d === void 0 ? void 0 : _d.replace(`${productLocation}, `, "");
        yield prisma_1.prisma.product.update({
            where: {
                id: product === null || product === void 0 ? void 0 : product.id,
            },
            data: {
                locations: updatedLocations,
            },
        });
    }
    else {
        yield prisma_1.prisma.palletProduct.update({
            where: {
                id: productPallet === null || productPallet === void 0 ? void 0 : productPallet.id,
            },
            data: {
                quantity: (productPallet === null || productPallet === void 0 ? void 0 : productPallet.quantity) - quantity,
            },
        });
    }
    yield prisma_1.prisma.orderProduct.updateMany({
        where: {
            orderId: orderProductsData === null || orderProductsData === void 0 ? void 0 : orderProductsData.id,
            productId,
        },
        data: {
            picked: true,
        },
    });
    yield prisma_1.prisma.user.update({
        where: { id: user.userId },
        data: {
            totalPicks: {
                increment: quantity,
            },
            todayPicks: {
                increment: quantity,
            },
        },
    });
    // check if completed
    const currentOrderData = yield prisma_1.prisma.order.findFirst({
        where: { status: "PICKING", userId: user.userId },
        select: {
            id: true,
            orderProducts: {
                where: {
                    productId,
                    picked: false,
                },
            },
        },
    });
    if (!(currentOrderData === null || currentOrderData === void 0 ? void 0 : currentOrderData.orderProducts[0])) {
        yield prisma_1.prisma.order.update({
            where: {
                id: currentOrderData === null || currentOrderData === void 0 ? void 0 : currentOrderData.id,
            },
            data: {
                status: "PICKED",
            },
        });
        res.status(http_status_codes_1.StatusCodes.OK).json({ data: "completed" });
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ data: null });
});
exports.pickProduct = pickProduct;
// update product stock quantity - x
// update location
// update product location if item quantity is equal 0
// update order product status

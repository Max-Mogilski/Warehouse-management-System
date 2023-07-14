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
exports.getPalletProducts = exports.createPallet = void 0;
const prisma_1 = require("../prisma/prisma");
const http_status_codes_1 = require("http-status-codes");
const custom_api_1 = __importDefault(require("../errors/custom-api"));
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const createPallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { locationId } = req.body;
    if (!locationId) {
        throw new bad_request_1.default("Please provide location id!");
    }
    const existingPallet = yield prisma_1.prisma.location.findUnique({
        where: { id: locationId },
        select: { palletId: true },
    });
    if (!existingPallet) {
        throw new bad_request_1.default(`Provided location with id ${locationId} doesn't exists!`);
    }
    if (existingPallet.palletId) {
        throw new bad_request_1.default("Location already contains a pallet.");
    }
    const pallet = yield prisma_1.prisma.pallet.create({
        data: {
            locationId: locationId,
        },
    });
    if (!pallet) {
        throw new custom_api_1.default("Couldn't create new pallet, try again later!");
    }
    yield prisma_1.prisma.location.update({
        where: { id: pallet.locationId },
        data: {
            palletId: pallet.id,
        },
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ data: pallet });
});
exports.createPallet = createPallet;
const getPalletProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        throw new bad_request_1.default("Please provide pallet id!");
    }
    const products = yield prisma_1.prisma.palletProduct.findMany({
        where: {
            palletId: id,
        },
        select: {
            quantity: true,
            product: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ data: products });
});
exports.getPalletProducts = getPalletProducts;

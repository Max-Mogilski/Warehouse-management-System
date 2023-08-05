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
exports.getAllLocations = exports.getLocation = exports.createLocation = void 0;
const prisma_1 = require("../prisma/prisma");
const http_status_codes_1 = require("http-status-codes");
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const createLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const locationsCount = yield prisma_1.prisma.location.count();
    const location = yield prisma_1.prisma.location.create({
        data: {
            locationNo: locationsCount + 1,
        },
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ data: location });
});
exports.createLocation = createLocation;
const getLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        throw new bad_request_1.default("Please provide location ID!");
    }
    const location = yield prisma_1.prisma.location.findFirst({ where: { id } });
    if (!location) {
        throw new bad_request_1.default(`Location with ID ${id} doesn't exists!`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ data: location });
});
exports.getLocation = getLocation;
const getAllLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const locations = yield prisma_1.prisma.location.findMany({});
    res.status(http_status_codes_1.StatusCodes.OK).json({ data: locations });
});
exports.getAllLocations = getAllLocations;

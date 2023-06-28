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
exports.createRefreshToken = void 0;
const prisma_1 = require("../prisma/prisma");
const crypto_1 = __importDefault(require("crypto"));
const createRefreshToken = (req, user) => __awaiter(void 0, void 0, void 0, function* () {
    let refreshToken = "";
    refreshToken = crypto_1.default.randomBytes(40).toString("hex");
    const userAgent = req.headers["user-agent"] || "";
    const ip = req.ip;
    const userToken = {
        refreshToken,
        userAgent,
        ip,
        user: { connect: { id: user.id } },
        isValid: true,
    };
    yield prisma_1.prisma.token.create({ data: userToken });
    return refreshToken;
});
exports.createRefreshToken = createRefreshToken;

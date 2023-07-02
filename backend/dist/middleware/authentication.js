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
exports.authenticateUser = void 0;
const unauthenticated_1 = __importDefault(require("../errors/unauthenticated"));
const jwt_1 = require("../utils/auth/jwt");
const prisma_1 = require("../prisma/prisma");
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken, accessToken } = req.signedCookies;
    try {
        if (accessToken) {
            const payload = (0, jwt_1.isTokenValid)(accessToken);
            req.user = payload.user;
            return next();
        }
        const payload = (0, jwt_1.isTokenValid)(refreshToken);
        const existingToken = yield prisma_1.prisma.token.findFirst({
            where: {
                userId: payload.user.id,
                refreshToken: payload.user.refreshToken,
            },
        });
        if (!existingToken || !(existingToken === null || existingToken === void 0 ? void 0 : existingToken.isValid)) {
            throw new unauthenticated_1.default("Authentication Invalid");
        }
        (0, jwt_1.attachCookiesToResponse)({
            res,
            user: payload.user,
            refreshToken: existingToken.refreshToken,
        });
        req.user = payload.user;
        next();
    }
    catch (error) {
        throw new unauthenticated_1.default("Authentication Invalid");
    }
});
exports.authenticateUser = authenticateUser;

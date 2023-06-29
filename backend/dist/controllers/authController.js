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
exports.logout = exports.login = exports.register = void 0;
const http_status_codes_1 = require("http-status-codes");
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const prisma_1 = require("../prisma/prisma");
const jwt_1 = require("../utils/jwt");
const createTokenUser_1 = require("../utils/createTokenUser");
const passwordHash_1 = require("../utils/passwordHash");
const unauthenticated_1 = __importDefault(require("../errors/unauthenticated"));
const removeCookie_1 = require("../utils/removeCookie");
const createRefreshToken_1 = require("../utils/createRefreshToken");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        throw new bad_request_1.default("Please provide all required values");
    }
    const userCredentials = fullName.split(" ");
    if (userCredentials.length < 2) {
        throw new bad_request_1.default("Please provide your firstname and lastname");
    }
    // Need to change user model to fullname instead of firstname and lastname !!!
    const firstName = userCredentials[0];
    const lastName = userCredentials[1];
    // throw an error if user already exists
    const isEmailInUse = yield prisma_1.prisma.user.findFirst({
        where: {
            email: { equals: email },
        },
    });
    if (isEmailInUse) {
        throw new bad_request_1.default("Email already exists");
    }
    const hashedPassword = yield (0, passwordHash_1.hashPassword)(password);
    const userData = { firstName, lastName, email, password: hashedPassword };
    const user = yield prisma_1.prisma.user.create({
        data: userData,
    });
    // create token data, token and attach cookie
    const tokenUserData = (0, createTokenUser_1.createTokenUser)(user);
    const refreshToken = yield (0, createRefreshToken_1.createRefreshToken)(req, user);
    (0, jwt_1.attachCookiesToResponse)({ res, user: tokenUserData, refreshToken });
    return res.status(http_status_codes_1.StatusCodes.CREATED).json({ user: tokenUserData });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new bad_request_1.default("Please provide all required values");
    }
    const user = yield prisma_1.prisma.user.findFirst({
        where: {
            email: { equals: email },
        },
    });
    if (!user) {
        throw new unauthenticated_1.default("Invalid credentials");
    }
    const isMatch = yield (0, passwordHash_1.comparePassword)(password, user.password);
    if (!isMatch) {
        throw new bad_request_1.default("Invalid credentials");
    }
    const existingToken = yield prisma_1.prisma.token.findFirst({
        where: {
            userId: user.id,
        },
    });
    let refreshToken = "";
    if (existingToken) {
        const { isValid } = existingToken;
        if (!isValid) {
            throw new unauthenticated_1.default("Invalid credentials");
        }
        refreshToken = existingToken.refreshToken;
    }
    else {
        refreshToken = yield (0, createRefreshToken_1.createRefreshToken)(req, user);
    }
    const tokenUser = (0, createTokenUser_1.createTokenUser)(user);
    (0, jwt_1.attachCookiesToResponse)({ res, user: tokenUser, refreshToken });
    return res.status(http_status_codes_1.StatusCodes.OK).json({ user: tokenUser });
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.token.delete({
        where: {
            userId: req.user.userId,
        },
    });
    (0, removeCookie_1.removeCookie)(res, "accessToken");
    (0, removeCookie_1.removeCookie)(res, "refreshToken");
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "user logged out!" });
});
exports.logout = logout;

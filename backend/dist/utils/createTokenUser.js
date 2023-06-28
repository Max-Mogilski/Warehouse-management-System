"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenUser = void 0;
const createTokenUser = (user) => {
    return { firstName: user.firstName, userId: user.id };
};
exports.createTokenUser = createTokenUser;

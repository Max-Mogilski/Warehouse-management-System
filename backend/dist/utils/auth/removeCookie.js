"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCookie = void 0;
const removeCookie = (res, name) => res.cookie(name, "null", {
    httpOnly: true,
    expires: new Date(Date.now()),
});
exports.removeCookie = removeCookie;

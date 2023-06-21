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
require("dotenv").config();
require("express-async-errors");
const path_1 = __importDefault(require("path"));
// extra security packages
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
// app init
const express_1 = __importDefault(require("express"));
const globalRouter_1 = __importDefault(require("./routes/globalRouter"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("tiny"));
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.resolve(__dirname, "../../client/dist")));
// routes /api/v1/
app.use("/api/v1", globalRouter_1.default);
// frontend routes
app.get("*", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "../../client/dist", "index.html"));
});
const port = process.env.PORT || 8080;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    }
    catch (error) {
        console.log(error);
    }
});
start();

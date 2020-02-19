"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const passport_1 = __importDefault(require("passport"));
const logger_1 = require("../config/logger");
exports.handleHelmet = (router) => router.use(helmet_1.default());
exports.handleMorgan = (router) => router.use(morgan_1.default("combined", { stream: logger_1.stream }));
exports.handlePassport = (router) => router.use(passport_1.default.initialize());
exports.handleCompression = (router) => router.use(compression_1.default());
exports.handleCors = (router) => router.use(cors_1.default({ credentials: true, origin: true }));
exports.handleBodyRequestParsing = (router) => {
    router.use(body_parser_1.default.urlencoded({ extended: true }));
    router.use(body_parser_1.default.json());
};
//# sourceMappingURL=common.js.map
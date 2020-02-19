"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const httpErrors_1 = require("../utils/httpErrors");
const logger_1 = __importDefault(require("../config/logger"));
exports.notFoundError = () => {
    throw new httpErrors_1.HTTP404Error("Method not found.");
};
exports.clientError = (err, res, next) => {
    if (err instanceof httpErrors_1.HTTPClientError) {
        logger_1.default.warn('clientError => ', err);
        res.status(err.statusCode).send(err.message);
    }
    else {
        next(err);
    }
};
exports.serverError = (err, res, next) => {
    logger_1.default.error('serverError => ', err);
    if (err.status) {
        res.status(err.status).send(err);
    }
    else if (process.env.NODE_ENV === "production") {
        res
            .status(http_status_codes_1.default.INTERNAL_SERVER_ERROR)
            .send("Internal Server Error");
    }
    else {
        res
            .status(http_status_codes_1.default.INTERNAL_SERVER_ERROR)
            .send(err.stack);
    }
};
//# sourceMappingURL=ErrorHandler.js.map
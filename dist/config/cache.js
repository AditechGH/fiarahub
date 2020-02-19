"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const constants_1 = __importDefault(require("./constants"));
const logger_1 = __importDefault(require("./logger"));
class Cache {
    constructor() {
        this.client = redis_1.createClient(constants_1.default.REDIS_PORT, constants_1.default.REDIS_HOST);
        this.client.on('connect', this.connected);
        this.client.on('error', this.error);
    }
    connected() {
        logger_1.default.info(`Successfully connected to Redis on: ${constants_1.default.REDIS_HOST}:${constants_1.default.REDIS_PORT}`);
    }
    error(error) {
        logger_1.default.error(`Error in Redis client: ${error.message}`, error);
    }
}
exports.default = Cache;
//# sourceMappingURL=cache.js.map
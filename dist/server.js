"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const middleware_1 = __importDefault(require("./middleware"));
const errorHandlers_1 = __importDefault(require("./middleware/errorHandlers"));
const modules_1 = __importDefault(require("./modules"));
const constants_1 = __importDefault(require("./config/constants"));
const database_1 = __importDefault(require("./config/database"));
const cache_1 = __importDefault(require("./config/cache"));
const logger_1 = __importDefault(require("./config/logger"));
new database_1.default();
new cache_1.default();
process.on("uncaughtException", e => {
    logger_1.default.error(`uncaughtException => `, e);
    process.exit(1);
});
process.on("unhandledRejection", (e) => {
    logger_1.default.error(`unhandledRejection => `, e);
    process.exit(1);
});
const router = express_1.default();
utils_1.applyMiddleware(middleware_1.default, router);
utils_1.applyRoutes(modules_1.default, router);
utils_1.applyMiddleware(errorHandlers_1.default, router);
const server = http_1.default.createServer(router);
server.listen(constants_1.default.PORT, () => logger_1.default.info(`Server running on port: ${constants_1.default.PORT} - Running on ${process.env.NODE_ENV}`));
//# sourceMappingURL=server.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = __importDefault(require("./constants"));
const logger_1 = __importDefault(require("./logger"));
class Db {
    constructor() {
        mongoose_1.connect(constants_1.default.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        this._db = mongoose_1.connection;
        this._db.on('open', this.connected);
        this._db.on('error', this.error);
    }
    connected() {
        logger_1.default.info(`Connected to database: ${constants_1.default.MONGO_URL}`);
    }
    error(error) {
        logger_1.default.error(`Mongoose has errored`, error);
    }
}
exports.default = Db;
//# sourceMappingURL=database.js.map
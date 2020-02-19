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
const redis_1 = __importDefault(require("redis"));
const client = redis_1.default.createClient();
exports.saveItem = (hash, data, duration = 1440) => __awaiter(void 0, void 0, void 0, function* () {
    client.set(hash, JSON.stringify(data));
    client.expire(hash, duration);
});
exports.getItem = (hash) => {
    return new Promise((resolve, reject) => {
        client.get(hash, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                reject(err);
            resolve(JSON.parse(data));
        }));
    });
};
exports.saveData = (hash, data) => __awaiter(void 0, void 0, void 0, function* () {
    client.hmset(hash, data);
});
exports.getData = (hash) => {
    return new Promise((resolve, reject) => {
        client.hgetall(hash, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                reject(err);
            resolve(data);
        }));
    });
};
exports.remove = (hash) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        client.del(hash, (err, response) => {
            if (err)
                reject(err);
            resolve(response);
        });
    });
});
exports.exists = (hash) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        client.exists(hash, (err, response) => {
            if (err)
                reject(err);
            resolve(response);
        });
    });
});
//# sourceMappingURL=cache.service.js.map
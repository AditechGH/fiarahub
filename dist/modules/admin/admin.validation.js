"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
exports.registerAdmin = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().regex(passwordReg).required(),
    type: joi_1.default.string().required(),
    name: joi_1.default.string().required()
});
exports.changePassword = joi_1.default.object({
    password: joi_1.default.string().regex(passwordReg).required(),
});
exports.updateAdmin = joi_1.default.object({
    email: joi_1.default.string().email(),
    type: joi_1.default.string(),
    name: joi_1.default.string()
});
//# sourceMappingURL=admin.validation.js.map
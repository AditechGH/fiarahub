"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_routes_1 = __importDefault(require("./admin/admin.routes"));
const department_routes_1 = __importDefault(require("./department/department.routes"));
exports.default = [
    ...admin_routes_1.default,
    ...department_routes_1.default
];
//# sourceMappingURL=index.js.map
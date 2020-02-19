"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_joi_validation_1 = require("express-joi-validation");
const admin_controller_1 = require("./admin.controller");
const validation = __importStar(require("./admin.validation"));
const auth_service_1 = require("../../services/auth.service");
const path = '/api/v1/admin';
const adminController = new admin_controller_1.AdminController();
const validator = express_joi_validation_1.createValidator();
exports.default = [
    {
        path: `${path}/register`,
        method: "post",
        handler: [
            validator.body(validation.registerAdmin),
            adminController.register
        ]
    },
    {
        path: `${path}/login`,
        method: "post",
        handler: [
            auth_service_1.authLocalAdmin,
            adminController.login
        ]
    },
    {
        path: `${path}s`,
        method: "get",
        handler: [
            auth_service_1.authJwtAdmin,
            adminController.getAdmins
        ]
    },
    {
        path: `${path}/:id`,
        method: "get",
        handler: [
            auth_service_1.authJwtAdmin,
            adminController.getAdmin
        ]
    },
    {
        path: `${path}/change-password/:id`,
        method: "patch",
        handler: [
            auth_service_1.authJwtAdmin,
            validator.body(validation.changePassword),
            adminController.changePassword
        ]
    },
    {
        path: `${path}/:id`,
        method: "put",
        handler: [
            auth_service_1.authJwtAdmin,
            validator.body(validation.updateAdmin),
            adminController.updateAdmin
        ]
    },
    {
        path: `${path}/:id`,
        method: "delete",
        handler: [
            auth_service_1.authJwtAdmin,
            adminController.deleteAdmin
        ]
    }
];
//# sourceMappingURL=admin.routes.js.map
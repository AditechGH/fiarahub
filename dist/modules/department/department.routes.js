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
const department_controller_1 = require("./department.controller");
const validation = __importStar(require("./department.validation"));
const path = '/api/v1/department';
const departmentController = new department_controller_1.DepartmentController();
const validator = express_joi_validation_1.createValidator();
exports.default = [
    {
        path: `${path}`,
        method: "post",
        handler: [
            validator.body(validation.createDepartment),
            departmentController.addNewDepartment
        ]
    },
    {
        path: `${path}s`,
        method: "get",
        handler: [
            departmentController.getDepartments
        ]
    },
    {
        path: `${path}/:id`,
        method: "get",
        handler: [
            departmentController.getDepartment
        ]
    },
    {
        path: `${path}/:id`,
        method: "patch",
        handler: [
            validator.body(validation.updateDepartment),
            departmentController.updateDepartment
        ]
    },
    {
        path: `${path}/:id`,
        method: "delete",
        handler: [
            departmentController.deleteDepartment
        ]
    }
];
//# sourceMappingURL=department.routes.js.map
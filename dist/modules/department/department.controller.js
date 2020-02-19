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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const department_model_1 = __importDefault(require("./department.model"));
const cache = __importStar(require("../../services/cache.service"));
class DepartmentController {
    addNewDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newDepartment = new department_model_1.default(req.body);
                const promise = yield Promise.all([
                    newDepartment.save(),
                    cache.remove(`departments`)
                ]);
                res
                    .status(http_status_codes_1.default.CREATED)
                    .json(promise[0]);
            }
            catch (e) {
                res.status(http_status_codes_1.default.BAD_REQUEST).json(e);
            }
        });
    }
    getDepartments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const limit = req.query.limit ? parseInt(req.query.limit, 0) : 5;
            const page = req.query.page ? parseInt(req.query.page, 0) : 1;
            try {
                let departments = null;
                const num = yield cache.exists(`departments`);
                if (num === 1) {
                    const data = yield cache.getData(`departments`);
                    Object.keys(data).forEach(key => {
                        if (key === `${page}-${limit}`) {
                            departments = JSON.parse(data[key]);
                        }
                    });
                    if (!departments) {
                        departments = yield department_model_1.default.fetch({}, page, limit);
                    }
                }
                else {
                    departments = yield department_model_1.default.fetch({}, page, limit);
                }
                return res.status(http_status_codes_1.default.OK).json(departments);
            }
            catch (e) {
                res.status(http_status_codes_1.default.BAD_REQUEST).json(e);
            }
        });
    }
    getDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield cache.getItem(`department${req.params.id}`);
                if (data) {
                    return res.status(http_status_codes_1.default.OK).json(data);
                }
                else {
                    const department = yield department_model_1.default.findById(req.params.id);
                    yield cache.saveItem(`department${req.params.id}`, department);
                    return res.status(http_status_codes_1.default.OK).json(department);
                }
            }
            catch (e) {
                res.status(http_status_codes_1.default.BAD_REQUEST).json(e);
            }
        });
    }
    updateDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const department = yield department_model_1.default.findById(req.params.id);
                Object.keys(req.body).forEach(key => {
                    department[key] = req.body[key];
                });
                const promise = yield Promise.all([
                    department.save(),
                    cache.remove(`departments`),
                    cache.remove(`department${req.params.id}`)
                ]);
                return res.status(http_status_codes_1.default.OK).json(promise[0]);
            }
            catch (e) {
                res.status(http_status_codes_1.default.BAD_REQUEST).json(e);
            }
        });
    }
    deleteDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const department = yield department_model_1.default.findById(req.params.id);
                yield Promise.all([
                    department.remove(),
                    cache.remove(`departments`),
                    cache.remove(`department${req.params.id}`)
                ]);
                return res.sendStatus(http_status_codes_1.default.OK);
            }
            catch (e) {
                res.status(http_status_codes_1.default.BAD_REQUEST).json(e);
            }
        });
    }
}
exports.DepartmentController = DepartmentController;
//# sourceMappingURL=department.controller.js.map
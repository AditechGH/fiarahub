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
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const admin_model_1 = __importDefault(require("./admin.model"));
const Admin = admin_model_1.default.iModel;
const _Admin = admin_model_1.default.model;
class AdminController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                payload.ip = req.headers['x-forwarded-for'] ||
                    req.connection.remoteAddress ||
                    req.socket.remoteAddress || null;
                const newAdmin = new _Admin(payload);
                const admin = yield newAdmin.save();
                res
                    .status(http_status_codes_1.default.CREATED)
                    .json(admin.toAuthJSON());
            }
            catch (e) {
                res.status(http_status_codes_1.default.BAD_REQUEST).json(e);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                user.lastlogin = new Date();
                user.ip = req.headers['x-forwarded-for'] ||
                    req.connection.remoteAddress ||
                    req.socket.remoteAddress || null;
                yield Admin.updateOne({ _id: user._id }, { $set: user });
                res.status(http_status_codes_1.default.OK).json(user.toAuthJSON());
            }
            catch (e) {
                res.status(http_status_codes_1.default.BAD_REQUEST).json(e);
            }
        });
    }
    getAdmins(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const limit = req.query.limit ? parseInt(req.query.limit, 0) : 5;
            const page = req.query.page ? parseInt(req.query.page, 0) : 1;
            try {
                const admins = yield Admin.fetch({}, page, limit);
                return res.status(http_status_codes_1.default.OK).json(admins);
            }
            catch (e) {
                res.status(http_status_codes_1.default.BAD_REQUEST).json(e);
            }
        });
    }
    getAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield Admin.findById(req.params.id);
                return res.status(http_status_codes_1.default.OK).json(admin);
            }
            catch (e) {
                res.status(http_status_codes_1.default.BAD_REQUEST).json(e);
            }
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield Admin.findById(req.params.id);
                const user = req.user;
                if (!admin._id.equals(user._id)) {
                    return res.sendStatus(http_status_codes_1.default.UNAUTHORIZED);
                }
                if (!admin.authenticateUser(req.body.OldPassword)) {
                    return res.sendStatus(http_status_codes_1.default.UNAUTHORIZED);
                }
                admin.password = req.body.password;
                return res.status(http_status_codes_1.default.OK).json(yield admin.save());
            }
            catch (e) {
                res.status(http_status_codes_1.default.BAD_REQUEST).json(e);
            }
        });
    }
    updateAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield Admin.findById(req.params.id, { name: 1, email: 1, type: 1, avatar: 1 });
                const user = req.user;
                if (!admin._id.equals(user._id)) {
                    return res.sendStatus(http_status_codes_1.default.UNAUTHORIZED);
                }
                Object.keys(req.body).forEach(key => {
                    admin[key] = req.body[key];
                });
                return res.status(http_status_codes_1.default.OK).json(yield admin.save());
            }
            catch (e) {
                res.status(http_status_codes_1.default.BAD_REQUEST).json(e);
            }
        });
    }
    deleteAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield Admin.findById(req.params.id);
                yield admin.remove();
                return res.sendStatus(http_status_codes_1.default.OK);
            }
            catch (e) {
                res.status(http_status_codes_1.default.BAD_REQUEST).json(e);
            }
        });
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map
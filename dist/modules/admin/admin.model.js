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
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const validator_1 = __importDefault(require("validator"));
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = __importDefault(require("../../config/constants"));
class AdminModel {
    constructor() {
        const schema = new mongoose_1.Schema({
            name: {
                type: String,
                trim: true,
                required: [true, "name is required!"],
            },
            email: {
                type: String,
                unique: true,
                required: [true, "Email is required!"],
                trim: true,
                validate: {
                    validator(email) {
                        return validator_1.default.isEmail(email);
                    }
                }
            },
            password: {
                type: String,
                required: [true, "Password is required!"],
                trim: true
            },
            type: {
                type: String,
                required: [true, "Admin Type is required!"],
                trim: true
            },
            ip: {
                type: String,
                required: true,
                trim: true
            },
            signup: {
                type: Date,
                default: Date.now
            },
            lastlogin: {
                type: Date,
                default: Date.now
            },
            notescheck: {
                type: Date,
                default: Date.now
            },
            avatar: {},
        }, {
            autoIndex: true
        });
        schema.plugin(mongoose_unique_validator_1.default, {
            message: "{VALUE} already taken!"
        });
        schema.pre('save', function (next) {
            if (this.isModified("password")) {
                this.password = bcrypt_nodejs_1.default.hashSync(this.password);
            }
            next();
        });
        schema.methods = {
            authenticateUser(password) {
                return bcrypt_nodejs_1.default.compareSync(password, this.password);
            },
            createToken() {
                return jsonwebtoken_1.default.sign({
                    _id: this._id,
                }, constants_1.default.JWT_SECRET, { expiresIn: '24h' });
            },
            toAuthJSON() {
                return {
                    _id: this._id,
                    name: this.name,
                    email: this.email,
                    type: this.type,
                    avatar: this.avatar,
                    token: `bearer ${this.createToken()}`,
                };
            },
            toJSON() {
                return {
                    _id: this._id,
                    name: this.name,
                    email: this.email,
                    type: this.type,
                    avatar: this.avatar
                };
            }
        };
        schema.statics = {
            fetch(args, page, limit) {
                return __awaiter(this, void 0, void 0, function* () {
                    const promise = yield Promise.all([
                        this.countDocuments(args),
                        this.find(args).skip((page - 1) * limit).limit(limit)
                    ]);
                    return {
                        docs: promise[1],
                        page: page,
                        limit: limit,
                        total: promise[0],
                        pages: Math.ceil(promise[0] / limit) || 1,
                    };
                });
            }
        };
        this._model = mongoose_1.model('Admin', schema);
        this._iModel = mongoose_1.model('Admin', schema);
    }
    get model() {
        return this._model;
    }
    get iModel() {
        return this._iModel;
    }
}
exports.default = new AdminModel();
//# sourceMappingURL=admin.model.js.map
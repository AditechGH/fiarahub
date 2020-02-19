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
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const slug_1 = __importDefault(require("slug"));
const cache = __importStar(require("../../services/cache.service"));
class DepartmentModel {
    constructor() {
        const schema = new mongoose_1.Schema({
            name: {
                type: String,
                trim: true,
                required: [true, "Title is required!"],
                unique: true
            },
            slug: {
                type: String,
                trim: true,
                lowercase: true
            },
            description: {
                type: String,
                trim: true,
                required: false
            }
        }, { timestamps: true,
            autoIndex: true
        });
        schema.plugin(mongoose_unique_validator_1.default, {
            message: "{VALUE} already taken!"
        });
        schema.pre('validate', function (next) {
            this.slug = slug_1.default(this.name);
            next();
        });
        schema.methods = {
            toJSON() {
                return {
                    _id: this._id,
                    name: this.name,
                    slug: this.slug,
                    description: this.description,
                    createdAt: this.createdAt
                };
            }
        };
        schema.statics = {
            fetch(args, page, limit) {
                return __awaiter(this, void 0, void 0, function* () {
                    let departments = {};
                    const promise = yield Promise.all([
                        this.countDocuments(args),
                        this.find(args).skip((page - 1) * limit).limit(limit),
                        cache.exists(`departments`)
                    ]);
                    if (promise[2] === 1) {
                        departments = yield cache.getData(`departments`);
                    }
                    const results = {
                        docs: promise[1],
                        page: page,
                        limit: limit,
                        total: promise[0],
                        pages: Math.ceil(promise[0] / limit) || 1,
                    };
                    departments[`${page}-${limit}`] = JSON.stringify(results);
                    yield cache.saveData(`departments`, departments);
                    return results;
                });
            }
        };
        this._model = mongoose_1.model('Department', schema);
    }
    get model() {
        return this._model;
    }
}
exports.default = new DepartmentModel().model;
//# sourceMappingURL=department.model.js.map
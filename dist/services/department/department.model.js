"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const slug_1 = __importDefault(require("slug"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
// export interface DepartmentModel extends Model<IDepartment> {};
class Department {
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
                required: true
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
                    createdAt: this.createdAt,
                    slug: this.slug,
                    description: this.description
                };
            }
        };
        this._model = mongoose_1.model('Department', schema);
    }
    get model() {
        return this._model;
    }
}
exports.Department = Department;
//# sourceMappingURL=department.model.js.map
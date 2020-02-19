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
const passport_1 = __importDefault(require("passport"));
const passportLocal = __importStar(require("passport-local"));
const passport_jwt_1 = require("passport-jwt");
const constants_1 = __importDefault(require("../config/constants"));
const admin_model_1 = __importDefault(require("../modules/admin/admin.model"));
const Admin = admin_model_1.default.model;
const LocalStrategy = passportLocal.Strategy;
const localOpts = {
    usernameField: "email"
};
const jwtOpts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: constants_1.default.JWT_SECRET
};
const localStrategyAdmin = new LocalStrategy(localOpts, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Admin.findOne({
            email
        });
        if (!user) {
            return done(null, false);
        }
        else if (!user.authenticateUser(password)) {
            return done(null, false);
        }
        return done(null, user);
    }
    catch (e) {
        return done(e, false);
    }
}));
const jwtStrategyAdmin = new passport_jwt_1.Strategy(jwtOpts, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield Admin.findById(payload._id);
        if (!admin) {
            return done(null, false);
        }
        return done(null, admin);
    }
    catch (e) {
        return done(e, false);
    }
}));
passport_1.default.use("admin-local", localStrategyAdmin);
passport_1.default.use("admin-jwt", jwtStrategyAdmin);
exports.authLocalAdmin = passport_1.default.authenticate("admin-local", { session: false });
exports.authJwtAdmin = passport_1.default.authenticate("admin-jwt", { session: false });
//# sourceMappingURL=auth.service.js.map
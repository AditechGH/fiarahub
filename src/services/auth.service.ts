import passport from "passport";
import * as passportLocal from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import constants from "../config/constants";
import AdminModel from "../modules/admin/admin.model";

const Admin = AdminModel.model;
const LocalStrategy = passportLocal.Strategy;
const localOpts = {
  usernameField: "email"
};
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: constants.JWT_SECRET
};

const localStrategyAdmin = new LocalStrategy(
  localOpts,
  async (email, password, done) => {
    try {
      const user = await Admin.findOne({
        email
      });
      if (!user) {
        return done(null, false);
      } else if (!user.authenticateUser(password)) {
        return done(null, false);
      }
      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  }
);

const jwtStrategyAdmin = new JwtStrategy(
  jwtOpts,
  async (payload, done) => {
    try {
      const admin = await Admin.findById(payload._id);

      if (!admin) {
        return done(null, false);
      }
      return done(null, admin);
    } catch (e) {
      return done(e, false);
    }
  }
);


passport.use("admin-local", localStrategyAdmin);
passport.use("admin-jwt", jwtStrategyAdmin);

export const authLocalAdmin = passport.authenticate("admin-local", { session: false });
export const authJwtAdmin = passport.authenticate("admin-jwt", { session: false });

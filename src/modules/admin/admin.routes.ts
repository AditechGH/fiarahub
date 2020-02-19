import {createValidator} from "express-joi-validation";
import { AdminController } from "./admin.controller";
import * as validation from "./admin.validation";
import { authJwtAdmin, authLocalAdmin } from "../../services/auth.service";

const path = '/api/v1/admin';
const adminController = new AdminController();
const validator = createValidator();

export default [
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
      authLocalAdmin,
      adminController.login
    ]
  },
  {
    path: `${path}s`,
    method: "get",
    handler: [
      authJwtAdmin,
      adminController.getAdmins
    ]
  },
  {
    path: `${path}/:id`,
    method: "get",
    handler: [
      authJwtAdmin,
      adminController.getAdmin
    ]
  },
  {
    path: `${path}/change-password/:id`,
    method: "patch",
    handler: [
      authJwtAdmin,
      validator.body(validation.changePassword),
      adminController.changePassword
    ]
  },
  {
    path: `${path}/:id`,
    method: "put",
    handler: [
      authJwtAdmin,
      validator.body(validation.updateAdmin),
      adminController.updateAdmin
    ]
  },
  {
    path: `${path}/:id`,
    method: "delete",
    handler: [
      authJwtAdmin,
      adminController.deleteAdmin
    ]
  }
];

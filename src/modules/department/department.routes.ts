import {createValidator} from "express-joi-validation";
import { DepartmentController } from "./department.controller";
import * as validation from "./department.validation";
import { authJwtAdmin } from "../../services/auth.service";

const path: string = '/api/v1/department';
const departmentController = new DepartmentController();
const validator = createValidator();

export default [
  {
    path: `${path}`,
    method: "post",
    handler: [
      authJwtAdmin,
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
      authJwtAdmin,
      validator.body(validation.updateDepartment),
      departmentController.updateDepartment
    ]
  },
  {
    path: `${path}/:id`,
    method: "delete",
    handler: [
      authJwtAdmin,
      departmentController.deleteDepartment
    ]
  }
];

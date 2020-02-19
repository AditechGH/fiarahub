import {createValidator} from "express-joi-validation";
import { CategoryController } from "./category.controller";
import * as validation from "./category.validation";
import { authJwtAdmin } from "../../services/auth.service";

const path: string = '/api/v1/category';
const categoryController = new CategoryController();
const validator = createValidator();

export default [
  {
    path: `${path}`,
    method: "post",
    handler: [
      authJwtAdmin,
      validator.body(validation.createCategory),
      categoryController.addNewCategory
    ]
  },
  {
    path: `${path}s`,
    method: "get",
    handler: [
      categoryController.getCategories
    ]
  },
  {
    path: `${path}/:id`,
    method: "get",
    handler: [
      categoryController.getCategory
    ]
  },
  {
    path: `${path}/:id`,
    method: "patch",
    handler: [
      authJwtAdmin,
      validator.body(validation.updateCategory),
      categoryController.updateCategory
    ]
  },
  {
    path: `${path}/:id`,
    method: "delete",
    handler: [
      authJwtAdmin,
      categoryController.deleteCategory
    ]
  }
];

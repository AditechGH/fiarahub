import adminRoutes from "./admin/admin.routes";
import departmentRoutes from "./department/department.routes";
import categoryRoutes from "./category/category.routes";
import productRoutes from "./product/product.routes";
import productCategoryRoutes from "./product_category/product_category.routes";

export default [
  ...adminRoutes,
  ...departmentRoutes,
  ...categoryRoutes,
  ...productRoutes,
  ...productCategoryRoutes
];

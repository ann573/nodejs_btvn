import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategory,
  getCategoryById,
  softDeleteCategory,
  unSoftDeleteCategory
} from "../controllers/categoryControllers.js";
import { categorySchema } from "../validate/categoryValidate.js";
import { validateAction } from './../middlewares/validBodyRequest.js';

const categoryRoutes = Router();

categoryRoutes.post("/", validateAction(categorySchema), createCategory);
categoryRoutes.get("/:id", getCategoryById);
categoryRoutes.get("/", getAllCategory);
categoryRoutes.patch("/:id",validateAction(categorySchema), editCategory);
categoryRoutes.patch("/soft_delete/:id",softDeleteCategory);
categoryRoutes.patch("/un_soft_delete/:id",unSoftDeleteCategory);
categoryRoutes.delete("/:id",deleteCategory);

export default categoryRoutes;

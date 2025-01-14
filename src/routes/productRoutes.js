import dotenv from "dotenv";
import { Router } from "express";

import { deleteFormCategory } from "../middlewares/deleteFormCategory.js";
import { editFormCategory } from "../middlewares/editFormCategory.js";
import { productSchema } from "../validate/productValidate.js";
import {
  create,
  getAll,
  getById,
  removeById,
  softDelete,
  unSoftDelete,
  updateById,
} from "./../controllers/productControllers.js";
import { validateAction } from "./../middlewares/validBodyRequest.js";

import { verifyUser } from "../middlewares/verifyUser.js";


const productRoutes = Router();

productRoutes.get("/", getAll);
productRoutes.get("/:id", getById);
productRoutes.post("/", verifyUser, validateAction(productSchema), create);
productRoutes.patch("/:id", editFormCategory, updateById);
productRoutes.patch("/soft_delete/:id", softDelete);
productRoutes.patch("/undeleted_soft/:id", unSoftDelete);
productRoutes.delete("/:id", deleteFormCategory, removeById);

export default productRoutes;

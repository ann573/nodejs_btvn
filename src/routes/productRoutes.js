
import {Router} from "express"
import { getAll, getById, create, updateById, removeById, softDelete, unSoftDelete } from './../controllers/productControllers.js';
import { productSchema } from "../validate/productValidate.js";
import { validateAction } from './../middlewares/validBodyRequest.js';
import { deleteFormCategory } from "../middlewares/deleteFormCategory.js";
import { editFormCategory } from "../middlewares/editFormCategory.js";

const productRoutes = Router()

productRoutes.get("/", getAll)
productRoutes.get("/:id", getById)
productRoutes.post("/",validateAction(productSchema), create)
productRoutes.patch("/:id",editFormCategory, updateById)
productRoutes.patch("/soft_delete/:id", softDelete)
productRoutes.patch("/undeleted_soft/:id", unSoftDelete)
productRoutes.delete("/:id",deleteFormCategory, removeById)

export default productRoutes

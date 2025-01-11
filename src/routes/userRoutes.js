
import {Router} from "express"
import { getAll, getById, create, updateById, removeById } from './../controllers/userController.js';

const userRoutes = Router()

userRoutes.get("/", getAll)
userRoutes.get("/:id", getById)
userRoutes.post("/:id", create)
userRoutes.patch("/:id", updateById)
userRoutes.delete("/:id", removeById)

export default userRoutes

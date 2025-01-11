import {Router} from "express"
import { register, login } from './../controllers/authController.js';
import { validateAction } from './../middlewares/validBodyRequest.js';
import { authLoginSchema, authRegisterSchema } from './../validate/authValidate.js';

const authRoutes = Router();

authRoutes.post("/register", validateAction(authRegisterSchema), register)
authRoutes.post("/login",validateAction(authLoginSchema) ,login)

export default authRoutes
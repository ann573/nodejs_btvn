import { Router } from "express";
import productRoutes from "./productRoutes.js";
import userRoutes from "./userRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import authRoutes from './authRoutes.js';

const routes = Router();

routes.use("/api/products", productRoutes);
routes.use("/api/category", categoryRoutes);
routes.use("/api/auth", authRoutes)
routes.use("/api/users", userRoutes)

export default routes;

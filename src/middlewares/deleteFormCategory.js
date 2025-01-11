import mongoose from "mongoose";
import Category from "../models/category.js";
import Product from "../models/product.js";
import { errorResponse } from "../utils/returnResponse.js";

export const deleteFormCategory = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return errorResponse(res, 404, "Không tìm thấy sản phẩm");
    }
    const category = await Category.findOne({ _id: product.category });
    if (!category) {
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    }
    await mongoose.model("Category").findByIdAndUpdate(category._id, {
      $pull: { products: req.params.id },
    });
    next();
  } catch (error) {
    console.log(error);
    errorResponse(res, 400, "Server bị lỗi ");
  }
};

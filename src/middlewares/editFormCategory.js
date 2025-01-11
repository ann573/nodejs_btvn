import Category from "../models/category.js"; 
import Product from "../models/product.js";

export const editFormCategory = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findOne({ _id: req.params.id });


    if (!updatedProduct) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    const prevCategory = updatedProduct.category; 
    const newCategory = req.body.category; 


    if (prevCategory !== newCategory) {
      if (prevCategory) {
        await Category.findByIdAndUpdate(prevCategory, {
          $pull: { products: updatedProduct._id },
        });
      }

      if (newCategory) {
        await Category.findByIdAndUpdate(newCategory, {
          $addToSet: { products: updatedProduct._id },
        });
      }
    }

    next();
  } catch (error) {
    errorResponse(res, 500, error);
  }
};

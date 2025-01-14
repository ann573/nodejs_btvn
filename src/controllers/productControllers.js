import { mongoose } from "mongoose";
import Category from "../models/category.js";
import Product from "../models/product.js";
import { errorResponse, successResponse } from "../utils/returnResponse.js";

export const create = async (req, res) => {
  try {
    if (
      req.body.category &&
      mongoose.Types.ObjectId.isValid(req.body.category)
    ) {
      const category = await Category.findById(req.body.category);
      if (!category) {
        return errorResponse(res, 404, "Danh mục không tồn tại");
      }
    }

    const result = await Product.create(req.body);

    await Category.updateOne(
      { _id: result.category }, 
      { $push: { products: result._id } } 
    );
    ;

    successResponse(res, 201, result, "Tạo sản phẩm thành công");
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, error);
  }
};

export const getAll = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "title -_id");
    successResponse(res, 200, products, "Lấy dữ liệu thành công");
  } catch (error) {
    errorResponse(res, 500, "Server error");
  }
};

export const getById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return errorResponse(res, 400, "Product ID sai định dạng");
    }

    const result = await Product.findById(req.params.id)
      .populate("category", "title -_id")
      .exec();

    if (result) {
      successResponse(res, 200, result);
    } else {
      errorResponse(res, 404, "Sản phẩm không tìm thấy");
    }
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Lỗi Server");
  }
};

export const removeById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return errorResponse(res, 400, "ID product không đúng định dạng");
    }
    const result = await Product.findById(req.params.id);

    if (result === null) {
      return errorResponse(res, 404, "Không tìm thấy sản phẩm");
    }
    await result.deleteOne();

    successResponse(res, 200, "Sản phẩm được xóa thành công");
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Server bị lỗi, vui lòng thử lại sau");
  }
};

export const softDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const date = new Date();

    const data = await Product.findByIdAndUpdate(
      id,
      { deletedAt: date, isHidden: true },
      { new: true }
    );

    if (!data) {
      return errorResponse(res, 404, "Không tìm thấy sản phẩm");
    }

    successResponse(res, 200, "Xóa mềm sản phẩm thành công");
  } catch (error) {
    errorResponse(res, 500, "Có lỗi xảy ra");
  }
};

export const unSoftDelete = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Product.findByIdAndUpdate(
      id,
      { isHidden: false },
      { new: true }
    );

    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product soft undeleted successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error",
      error: error.message,
    });
  }
};
export const updateById = async (req, res) => {
  try {
    const result = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      timestamps: true,
    });
    if (!result) {
      return errorResponse(res, 404, "Sản phẩm không tìm thấy");
    }

    successResponse(res, 200, result, "Sản phẩm được cập nhật thành công");
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Server bị lỗi");
  }
};

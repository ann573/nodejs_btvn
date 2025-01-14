import Category from "../models/category.js";
import product from "../models/product.js";
import { errorResponse, successResponse } from "./../utils/returnResponse.js";

export const createCategory = async (req, res) => {
  try {
    const data = await Category.create(req.body);
    successResponse(res, 200, data, "Lấy dữ liệu thành công");
  } catch (error) {
    errorResponse(res, 500, "Server bị lỗi");
  }
};

export const getCategoryById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Category.findById(id)
      .populate({
        path: "products",
        match: { isHidden: false}
      })
      .exec();
    res.status(200).json(data);
  } catch (error) {
    errorResponse(res, 500, "Server bị lỗi");
  }
};
export const getAllCategory = async (req, res) => {
  try {
    const data = await Category.find().populate("products").exec();
    successResponse(res, 200, data, "Lấy dữ liệu thành công");
  } catch (error) {
    errorResponse(res, 500, "Server bị lỗi");
  }
};

export const editCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    successResponse(res, 200, data, "Lấy dữ liệu thành công");
  } catch (error) {
    errorResponse(res, 500, "Server bị lỗi");
  }
};

export const softDeleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const date = new Date();

    const data = await Category.findByIdAndUpdate(
      id,
      { deletedAt: date, isHidden: true },
      { new: true }
    );

    if (!data) {
      return errorResponse(res, 404, "Không tìm thấy danh mục tương ứng");
    }

    successResponse(res, 200, data, "Xóa mềm thành công");
  } catch (error) {
    errorResponse(res, 500, "Server bị lỗi");
  }
};

export const unSoftDeleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Category.findByIdAndUpdate(
      id,
      { isHidden: true },
      { new: true }
    );

    if (!data) {
      return errorResponse(res, 404, "Không tìm thấy danh mục tương ứng");
    }

    successResponse(res, 200, data, "Hủy xóa mềm thành công");
  } catch (error) {
    errorResponse(res, 500, "Server bị lỗi");
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    if (id == "67836b1b6555d75d29c79318") {
      return errorResponse(res, 400, "Không được xóa danh mục mặc định");
    }

    await product.updateMany(
      { category: id },
      { category: "67836b1b6555d75d29c79318" }
    );
    const updatedProductIds =  await product.find({ category: "67836b1b6555d75d29c79318" }).select("_id");

    await Category.updateOne(
      {
        _id: "67836b1b6555d75d29c79318",
      },
      { $addToSet: { products: { $each: updatedProductIds.map((p) => p.id.toString()) } } }
    );

    const data = await Category.findByIdAndDelete(id);

    if (!data) {
      return errorResponse(res, 404, "Không tìm thấy danh mục tương ứng");
    }
    successResponse(res, 200, data, "Xóa danh mục thành công");
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Server bị lỗi");
  }
};

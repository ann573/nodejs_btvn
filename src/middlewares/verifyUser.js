import { errorResponse } from "../utils/returnResponse.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

const { PRIVATE_KEY } = process.env;
export const verifyUser = async (req, res, next) => {

  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  const decoded = jwt.verify(token, PRIVATE_KEY);

  if (!decoded) {
    return errorResponse(res, 400, "Không xác định");
  }

  const userExist = await User.findById(decoded.userId);
  if (userExist.role !== "admin") {
    errorResponse(res, 400, "Bạn không có quyền vào trang này");
  } else {
    next();
  }
};

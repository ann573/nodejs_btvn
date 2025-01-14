import { errorResponse } from "../utils/returnResponse";

export const verifyUser = async (req, res, next) => {
    console.log(req.headers);
  
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
  }
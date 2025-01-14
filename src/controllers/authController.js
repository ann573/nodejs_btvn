import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { errorResponse, successResponse } from "../utils/returnResponse.js";
const saltRounds = 10;

dotenv.config();

const { PRIVATE_KEY, REFRESH_TOKEN } = process.env;

export const register = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email bị trùng" });
    }

    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        return res.status(500).json({ error: "Lỗi khi tạo salt" });
      }

      bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ error: "Lỗi khi hash mật khẩu" });
        }
        const newUser = {
          ...req.body,
          password: hashedPassword,
        };
        try {
          const data = await User.create(newUser);
          data.password = undefined;

          successResponse(res, 201, data, "Tạo tài khoản thành công");
        } catch (error) {
          console.log(error)
          errorResponse(res, 500, "Lỗi khi lưu người dùng");
        }
      });
    });
  } catch (error) {
    errorResponse(res, 500, "Đã xảy ra lỗi khi đăng ký tài khoản");
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: "Email không tồn tại" });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Mật khẩu không đúng" });
    }

    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      PRIVATE_KEY,
      { expiresIn: "7d" }
    );

    user.password = undefined;
    successResponse(res, 200, { accessToken, user });
  } catch (error) {
    res.status(500).json({ error: "Đã xảy ra lỗi khi đăng nhập" });
  }
};

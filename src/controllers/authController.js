import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
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

          res.status(201).json({ message: "Tạo tài khoản thành công!", data });
        } catch (error) {
          res.status(500).json({ error: "Lỗi khi lưu người dùng" });
        }
      });
    });
  } catch (error) {
    res.status(500).json("Đã xảy ra lỗi khi đăng ký tài khoản");
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

    const token = jwt.sign({ userId: user._id, email: user.email }, PRIVATE_KEY, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user._id, email: user.email }, REFRESH_TOKEN)
    res.status(200).json({ message: "Đăng nhập thành công", token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Đã xảy ra lỗi khi đăng nhập" });
  }
};

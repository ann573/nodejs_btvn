
import User from './../models/user.js';
import { mongoose } from 'mongoose';
export const create = async (req, res) => {
    try {
      if (!req.body.title || !req.body.price)
        return res.status(400).json({ message: "Some field is missed" });
      const result = await User.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }
export const getAll = async (req, res) => {
    try {
      const products = await User.find().select("-password");
      res.status(200).json({
        message: "Lấy dữ liệu thành công",
        products,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
export const getById = async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid product ID format" });
      }
      const result = await User.findById(req.params.id);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
export const removeById = async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid product ID format" });
      }
  
      const result = await User.findByIdAndDelete(req.params.id);
  
      if (result === null) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
    
export const updateById = async (req, res) => {
    try {
      const result = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        timestamps: true,
      });
      if (!result) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User updated successfully", result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }


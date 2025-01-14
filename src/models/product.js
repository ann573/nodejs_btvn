import mongoose from "mongoose";

import { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: "67836b1b6555d75d29c79318",
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "Updating",
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);

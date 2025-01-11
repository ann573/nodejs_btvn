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
      default: "678230b197f4d602ae02cede",
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

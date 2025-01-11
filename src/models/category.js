import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      default: "Đang cập nhật",
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
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
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Category", categorySchema);

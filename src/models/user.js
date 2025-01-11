import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true, 
    required: true 
  },
  password: {
    type: String,
    required: [true, "Mật khẩu là bắt buộc"],
  },
  username: {
    type: String,
    require: true,
    unique: [true, "Username đã tồn tại"]
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin","superAdmin"]
  }
},{
  timestamps: true,
  versionKey: false
});

const User = mongoose.model("User", userSchema);
export default User;

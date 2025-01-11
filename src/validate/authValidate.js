import * as z from "zod";

export const authRegisterSchema = z.object({
  email: z.string().email("Phải là một email"),
  username: z.string().min(3, "Username cần tối thiểu 3 ký tự"),
  role: z.string().optional(),
  password: z.string().min(8, "Mật khẩu cần tối thiểu 8 ký tự"),
});

export const authLoginSchema = z.object({
  email: z.string().email("Phải là một email"),
  password: z.string().min(8, "Mật khẩu cần tối thiểu 8 ký tự"),
});

import * as z from 'zod'
export const productSchema = z.object({
    title: z.string().min(6,"Nhập tối thiểu 6 ký tự"),
    price: z.number({message: "Hãy nhập số"}).min(0,"Price phải là số dương"),
    description: z.string().optional().default("Đang cập nhật")
}) 
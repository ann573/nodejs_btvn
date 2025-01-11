import * as z from 'zod'

export const categorySchema = z.object({
    title: z.string().min(3, "Nhập tối thiểu 3 ký tự"),
    description: z.string().optional()  
})
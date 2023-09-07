import { z } from "zod"

export const createProductSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Title is required"
      })
      .min(3)
      .max(30),
    description: z
      .string({
        required_error: "Description is required"
      })
      .min(3)
      .max(30)
  })
})

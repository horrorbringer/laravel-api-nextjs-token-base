import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  description: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
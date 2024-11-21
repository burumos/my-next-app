import { z } from "zod";

export const SaveMemoSchema = z.object({
  id: z.coerce.number().optional(),
  content: z.string().max(100),
})

export const DeleteMemoSchema = z.object({
  id: z.coerce.number(),
});
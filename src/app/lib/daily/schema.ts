import { z } from "zod";

export const dailyFormSchema = z.object({
  id: z.number().positive().nullish(),
  text: z.string().min(1),
});

export const dailyDeleteSchema = z.object({
  id: z.number().positive(),
});

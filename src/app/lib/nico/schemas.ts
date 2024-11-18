import { z } from "zod";
import { toPositiveInt } from "../convert";

export const searchResponseSchema = z.object({
  data: z.array(
    z.object({
      commentCounter: z.number(),
      contentId: z.string(),
      lengthSeconds: z.number(),
      likeCounter: z.number(),
      startTime: z.string(),
      tags: z.string(),
      thumbnailUrl: z.string().url(),
      title: z.string(),
      viewCounter: z.number(),
      mylistCounter: z.number(),
    })
  ),
});

export const searchParamsSchema = z.object({
  q: z.string().nullish(),
  limit: z.string().nullish().transform(toPositiveInt),
  minimumViews: z.string().nullish().transform(toPositiveInt),
});

export const deleteParamsSchema = z.object({
  id: z.string().transform(toPositiveInt),
});

export const updateParamsSchema = z.object({
  id: z.coerce.number(),
  q: z.string(),
  limit: z.coerce.number(),
  minimumViews: z.string().nullish().transform(toPositiveInt),
});

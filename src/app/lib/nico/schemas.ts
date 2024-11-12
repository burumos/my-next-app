import { z } from "zod";

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
  q: z.string().trim(),
  limit: z.string().nullish().transform(toPositiveInt),
  minimumViews: z.string().nullish().transform(toPositiveInt),
});

function toPositiveInt(s: string | null | undefined): null | number {
  const int = parseInt(s || "");
  return isNaN(int) || int <= 0 ? null : int;
}

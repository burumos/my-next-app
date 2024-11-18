export type video = {
  commentCounter: number;
  contentId: string;
  lengthSeconds: number;
  likeCounter: number;
  startTime: string;
  tags: string;
  thumbnailUrl: string;
  title: string;
  viewCounter: number;
  mylistCounter: number;
};

export type SearchFormState = {
  errors?: {
    q?: string[];
    limit?: string[];
    minimumViews?: string[];
  };
  messages?: string | null;
};

export type SearchCondition = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  q: string;
  limit: number;
  minimumViews: number | null;
  userId: number;
};

export type UpdateSearchCondition = Pick<
  SearchCondition,
  "q" | "limit" | "minimumViews"
>;

export type UpdateSearchConditionState = {
  message?: string | undefined | null;
};


export type Daily = {
  id: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};

export type saveDailyState = {
  message: string;
  id?: number;
};

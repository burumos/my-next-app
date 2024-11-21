export type SavePrevStatus = {
  message?: string;
  errors?: {
    [k: string]: string[];
  };
  inputs?: {
    [k: string]: string | File;
  };
};

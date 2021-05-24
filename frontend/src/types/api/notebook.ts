export type Notebook = {
  id: number;
  memo: string | null;
  dinner: string | null;
  has_bathed: boolean | null;
  breakfast: string | null;
  date: Date | string | null;
  body_temperature: number | string | null;
};

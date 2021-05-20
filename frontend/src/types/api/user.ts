export type User = {
  id: number;
  role: 0 | 1;
  email: string | null;
  daycareId: number;
  password: string | null;
  gender: number;
  first_name: string | null;
  last_name: string | null;
  telephone_number: string | null;
};

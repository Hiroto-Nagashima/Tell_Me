export type User = {
  id: number;
  role: '保護者' | '先生';
  email: string | null;
  daycare_id: number;
  password: string | null;
  gender: number;
  first_name: string | null;
  last_name: string | null;
  telephone_number: string | null;
};

export type CurrentUser = {
  id: number;
  role: '保護者' | '先生';
  email: string | null;
  daycareId: number;
  password: string | null;
  gender: number;
  firstName: string | null;
  lastName: string | null;
  telephoneNumber: string | null;
};

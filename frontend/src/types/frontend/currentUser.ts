export type CurrentUser = {
  id: number;
  role: '保護者' | '先生';
  email: string;
  daycareId: number | null;
  password: string;
  gender: number | null;
  firstName: string;
  lastName: string;
  telephoneNumber: string;
  selfIntroduction: string | null;
  image: string | null;
};

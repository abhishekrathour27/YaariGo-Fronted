export interface UserType {
  _id: string;
  name: string;
  email: string;
  password: string;
  resetPasswordToken: string | null;
  resetPasswordExpires: string | number | null;
  __v?: number;
}
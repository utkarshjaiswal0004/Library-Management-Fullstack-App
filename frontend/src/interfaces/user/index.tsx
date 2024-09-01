export interface UserInfo {
  name: string;
  email: string;
  role: string;
  borrowedBooks?: [string, string] | [];
}

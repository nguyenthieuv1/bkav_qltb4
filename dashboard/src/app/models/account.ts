export interface Account {
  id?: number;
  username: string;
  password: string;
  phone?: string;
  address?: string;
  role?: string;
  fullName?: string;
  hasDevice?: boolean;
}

export interface ICustomer {
  id: string;
  fullName: string;
  email: string;
  age: number;
  diseases: string[];
  allergies: string[];
  address: string;
  phone: string;
  jobs: string[];
  score: number;
  created_at: Date;
  updated_at: Date;
}

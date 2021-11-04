import { ICustomer } from '../models/iCustomer';
import { IUpdateCustomer } from '../models/iUpdateCustomer';

export interface iCustomersRepository {
  findByEmail(email: string): Promise<ICustomer | undefined>;
  findById(id: string): Promise<ICustomer | undefined>;
  findAll(): Promise<ICustomer[]>;
  create(data: ICustomer): Promise<boolean | undefined>;
  update(data: IUpdateCustomer): Promise<ICustomer | undefined>;
}

import AppError from '@shared/errors/app_error';
import { ICustomer } from '../domain/models/iCustomer';
import { iCustomersRepository } from '../domain/repositories/iCustomersRepository';
import { CustomerRepository } from '../infra/dynamodb/repository/customer_repository';
import * as uuid from 'uuid';
import handleError from '@shared/errors/errorHandler';

class CreateCustomerService {
  private customerRepository: iCustomersRepository;
  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  public async execute({
    fullName,
    email,
    age,
    diseases,
    allergies,
    address,
    phone,
    jobs,
  }: ICustomer): Promise<ICustomer> {
    try {
      const customerExists = await this.customerRepository.findByEmail(email);

      if (customerExists) {
        throw new AppError('Email is already in use');
      }
      const timestamp = new Date();
      const id = uuid.v1();

      const customer: ICustomer = {
        id,
        fullName,
        email,
        age,
        diseases,
        allergies,
        address,
        phone,
        jobs,
        score: 0,
        created_at: timestamp,
        updated_at: timestamp,
      };
      await this.customerRepository.create(customer);

      return customer as ICustomer;
    } catch (error) {
      handleError(error);
    }
  }
}

export default CreateCustomerService;

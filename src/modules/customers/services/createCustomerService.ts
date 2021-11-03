import AppError from '@shared/errors/app_error';
import { ICustomer } from '../domain/models/iCustomer';
import { CustomerRepository } from '../infra/dynamodb/repository/customer_repository';
import * as uuid from 'uuid';
import handleError from '@shared/errors/errorHandler';

class CreateCustomerService {
  public static async execute({
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
      const customerRepository = new CustomerRepository();
      const customerExists = await customerRepository.findByEmail(email);

      if (customerExists) {
        handleError(new AppError('Email is already in use'));
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
      await customerRepository.create(customer);

      return customer as ICustomer;
    } catch (error) {
      handleError(error);
    }
  }
}

export default CreateCustomerService;

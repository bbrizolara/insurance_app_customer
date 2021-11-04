import { ICustomer } from '../domain/models/iCustomer';
import { CustomerRepository } from '../infra/dynamodb/repository/customer_repository';
import handleError from '@shared/errors/errorHandler';
import { IShowCustomer } from '../domain/models/iShowCustomer';

class ReadCustomerByEmailService {
  public static async execute({ email }: IShowCustomer): Promise<ICustomer | undefined> {
    try {
      const customerRepository = new CustomerRepository();
      const customer = await customerRepository.findByEmail(email);

      return customer;
    } catch (error) {
      handleError(error);
    }
  }
}

export default ReadCustomerByEmailService;

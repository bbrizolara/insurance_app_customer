import { ICustomer } from '../domain/models/iCustomer';
import { CustomerRepository } from '../infra/dynamodb/repository/customer_repository';
import handleError from '@shared/errors/errorHandler';

class ListCustomersService {
  public static async execute(): Promise<ICustomer[]> {
    try {
      const customerRepository = new CustomerRepository();
      const customers = await customerRepository.findAll();

      return customers;
    } catch (error) {
      handleError(error);
    }
  }
}

export default ListCustomersService;

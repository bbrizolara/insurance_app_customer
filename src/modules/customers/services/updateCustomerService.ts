import { ICustomer } from '../domain/models/iCustomer';
import { CustomerRepository } from '../infra/dynamodb/repository/customer_repository';
import handleError from '@shared/errors/errorHandler';
import { IUpdateCustomer } from '../domain/models/iUpdateCustomer';
import AppError from '@shared/errors/app_error';

class UpdateCustomerService {
  public static async execute(data: IUpdateCustomer): Promise<ICustomer | undefined> {
    try {
      const { id, fullName, age, diseases, address, allergies, phone, jobs } = data;
      const customerRepository = new CustomerRepository();

      const customer = await customerRepository.findById(id);
      if (!customer) {
        handleError(new AppError('Customer not found', 400));
      }

      const updated_at = new Date();
      customer.fullName = fullName;
      customer.age = age;
      customer.diseases = diseases;
      customer.address = address;
      customer.allergies = allergies;
      customer.phone = phone;
      customer.jobs = jobs;
      customer.updated_at = updated_at;
      await customerRepository.update(customer);

      return customer;
    } catch (error) {
      handleError(error);
    }
  }
}

export default UpdateCustomerService;

import { ICustomer } from '@modules/customers/domain/models/iCustomer';
import { IUpdateCustomer } from '@modules/customers/domain/models/iUpdateCustomer';
import { iCustomersRepository } from '@modules/customers/domain/repositories/iCustomersRepository';
import AppError from '@shared/errors/app_error';
import dynamodb from '@shared/infra/dynamodb';

export class CustomerRepository implements iCustomersRepository {
  public async findByName(name: string) {
    return undefined;
  }

  public async findByEmail(email: string) {
    return undefined;
  }

  public async findById(id: string) {
    return undefined;
  }

  public async create(data: ICustomer): Promise<boolean | undefined> {
    try {
      const params = {
        TableName: process.env.CUSTOMER_TABLE,
        Item: data,
      };
      dynamodb.put(params, (error, _) => {
        if (error) {
          console.error(error);
          throw new AppError(error.message, error.statusCode);
        }
      });

      return true;
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }

  public async update(data: IUpdateCustomer) {
    return undefined;
  }

  public async findAll() {
    return undefined;
  }
}

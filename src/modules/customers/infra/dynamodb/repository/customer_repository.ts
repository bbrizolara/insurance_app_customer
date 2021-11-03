import { ICustomer } from '@modules/customers/domain/models/iCustomer';
import { IUpdateCustomer } from '@modules/customers/domain/models/iUpdateCustomer';
import { iCustomersRepository } from '@modules/customers/domain/repositories/iCustomersRepository';
import AppError from '@shared/errors/app_error';
import handleError from '@shared/errors/errorHandler';
import dynamodb from '@shared/infra/dynamodb';

export class CustomerRepository implements iCustomersRepository {
  public async findByName(name: string) {
    return undefined;
  }

  public async findByEmail(email: string) {
    return undefined;
  }

  public async findById(id: string): Promise<ICustomer | undefined> {
    try {
      let customer;
      const params = {
        TableName: process.env.CUSTOMER_TABLE,
        Key: {
          id,
        },
      };

      dynamodb.get(params, (error, result) => {
        if (error) {
          handleError(new AppError(error.message, error.statusCode));
        }
        customer = result.Item;
      });

      //TODO: a mejorar
      if (customer) return customer as ICustomer;
      else return undefined;
    } catch (error) {
      handleError(error);
    }
  }

  public async create(data: ICustomer): Promise<boolean | undefined> {
    try {
      const params = {
        TableName: process.env.CUSTOMER_TABLE,
        Item: data,
      };
      dynamodb.put(params, (error, _) => {
        if (error) {
          handleError(new AppError(error.message, error.statusCode));
        }
      });

      return true;
    } catch (error) {
      handleError(error);
    }
  }

  public async update(data: IUpdateCustomer) {
    return undefined;
  }

  public async findAll() {
    try {
      let customers;
      const params = {
        TableName: process.env.CUSTOMER_TABLE,
      };

      dynamodb.scan(params, (error, result) => {
        if (error) {
          handleError(new AppError(error.message, error.statusCode));
        }
        customers = result.Items;
      });

      return customers as ICustomer[];
    } catch (error) {
      handleError(error);
    }
  }
}

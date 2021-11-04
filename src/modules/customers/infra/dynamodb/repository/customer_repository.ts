import { ICustomer } from '@modules/customers/domain/models/iCustomer';
import { iCustomersRepository } from '@modules/customers/domain/repositories/iCustomersRepository';
import AppError from '@shared/errors/app_error';
import handleError from '@shared/errors/errorHandler';
import dynamodb from '@shared/infra/dynamodb';

export class CustomerRepository implements iCustomersRepository {
  public async findByEmail(email: string): Promise<ICustomer | undefined> {
    try {
      let customer;
      const params = {
        TableName: process.env.CUSTOMER_TABLE,
        Key: {
          email: email,
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

  public async update(data: ICustomer): Promise<ICustomer | undefined> {
    try {
      let customer;
      let updateExpression = 'SET #fullName = :fullName, age = :age, diseases = :diseases, ';
      updateExpression += 'allergies = :allergies, address = :address, ';
      updateExpression += 'phone = :phone, jobs = :jobs, updated_at = :updated_at';
      const params = {
        TableName: process.env.CUSTOMER_TABLE,
        Key: {
          id: data.id,
        },
        ExpressionAttributeNames: {
          '#fullName': ':fullName',
        },
        ExpressionAttributeValues: {
          ':fullName': data.fullName,
          ':age': data.age,
          ':diseases': data.diseases,
          ':allergies': data.allergies,
          ':address': data.address,
          ':phone': data.phone,
          ':jobs': data.jobs,
          ':updated_at': data.updated_at,
        },
        UpdateExpression: updateExpression,
        ReturnValues: 'ALL_NEW',
      };

      dynamodb.update(params, (error, result) => {
        if (error) {
          console.error(error);
          handleError(new AppError(error.message, error.statusCode));
        }

        customer = result.Attributes;
      });

      return customer as ICustomer;
    } catch (error) {
      handleError(error);
    }
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

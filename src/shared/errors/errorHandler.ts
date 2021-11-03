import AppError from './app_error';

const handleError = (error: any) => {
  if (error instanceof AppError) {
    throw error;
  } else {
    throw new AppError(error.message, 500);
  }
};

export default handleError;

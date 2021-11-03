import AppError from './app_error';

const handleError = (error: any) => {
  console.error(error);
  if (error instanceof AppError) {
    throw error;
  } else {
    let message: string;
    if (error.message) {
      message = error.message;
    } else {
      message = 'Internal server error';
    }
    throw new AppError(message, 500);
  }
};

export default handleError;

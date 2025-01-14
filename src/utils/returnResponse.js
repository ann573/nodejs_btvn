export const successResponse = (res, statusCode, data, message = 'Thành công') => {
    return res.status(statusCode).json({
      success: true,
      message: message,
      data: data
    });
  };
  
  export const errorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({
      success: false,
      error: message
    });
  };
  
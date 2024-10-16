export const APIRouteNotFound = async (req, res, next) => {
  try {
    const error = new Error('API Route not found');
    error.status = 404;
    next(error);
  } catch (error) {
    throw new Error('Route not found', error);
  }
};

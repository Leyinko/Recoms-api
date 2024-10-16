export const excludeRoutes = (middleware, excludedRoutes) => {
  return function (req, res, next) {
    if (excludedRoutes.some((route) => req.path.startsWith(route))) {
      return next();
    }
    middleware(req, res, next);
  };
};

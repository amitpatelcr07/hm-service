export const roleMiddleware =
  (roles = []) =>
  (req, res, next) => {
    next();
  };

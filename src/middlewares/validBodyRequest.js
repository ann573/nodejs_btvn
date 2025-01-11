export const validateAction = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    const errors = err.errors.map((item) => item.message);
    res.status(400).json({ errors });
  }
};

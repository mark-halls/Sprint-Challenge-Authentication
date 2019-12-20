const validateBody = (requiredKeysArray = []) => (req, res, next) => {
  const body = req.body;
  const errors = requiredKeysArray.reduce((acc, required) => {
    if (body && !body[required]) {
      acc.push(`Body must contain ${required}`);
    } else {
      return acc;
    }
  }, []);
  if (errors.length !== 0) {
    res.status(400).json({ msg: errors });
  } else {
    next();
  }
};

module.exports = validateBody;

const authMiddleware = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.status(401).send({ message: 'You are not authorized' });
};

module.exports = authMiddleware;
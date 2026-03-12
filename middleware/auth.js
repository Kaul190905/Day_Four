const basicAuthString = 'admin:securepass123';
const authBuffer = Buffer.from(basicAuthString);
const expectedAuth = `Basic ${authBuffer.toString('base64')}`;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader !== expectedAuth) {
    return res.status(401).json({ error: 'Unauthorized: Invalid Basic Auth' });
  }
  req.user = 'admin';
  next();
};

module.exports = authMiddleware;

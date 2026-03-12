require("dotenv").config();

const user = process.env.BASIC_AUTH_USER || 'admin';
const pass = process.env.BASIC_AUTH_PASS || 'securepass123';
const authBuffer = Buffer.from(`${user}:${pass}`);
const expectedAuth = `Basic ${authBuffer.toString('base64')}`;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader !== expectedAuth) {
    return res.status(401).json({ error: 'Unauthorized: Invalid Basic Auth' });
  }
  req.user = user;
  next();
};

module.exports = authMiddleware;

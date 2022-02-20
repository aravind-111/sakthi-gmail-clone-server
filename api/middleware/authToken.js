import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = "SECRET"


export const generateToken = (id) => {
  return jwt.sign({ id }, new Buffer.from(secret, 'base64'), { expiresIn: '1h' });
};

export const authenticateToken = (request, response, next) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, new Buffer.from(secret, 'base64'));
    request.user = decoded.id;
    next();
  } catch (error) {
    console.log(error.message);
    response.status(401).json({ message: error.message });
  }
};

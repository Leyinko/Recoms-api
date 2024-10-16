import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign({ username: user.username, tokenVersion: user.tokenVersion }, process.env.JWT_KEY, {
    expiresIn: '1d',
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_KEY);
};

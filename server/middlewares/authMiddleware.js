import { verify } from '../utils/jwt.js';

const secret = process.env.SECRET || 'vape1097#%%#34yhx148fiuwehfi&*@ushering9357m30945rc1mh19';

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies['auth'];
  if (!token) {
    return next();
  }

  try {
    const decodedToken = await verify(token, secret);
    req.user = decodedToken;
    res.locals.isAuthenticated = true;
    next();
  } catch (err) {
    res.clearCookie('auth');
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export const isAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

export const isGuest = (req, res, next) => {
  if (req.user) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};
import pool from '../config/db.js';
import jwt from 'jsonwebtoken';

export const secure = async (req, res, postAction) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401);
    throw new Error('Not authorized: token invalid!');
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  const targetUser = await pool.query('SELECT id, name, email, role FROM users WHERE id = $1', [decodedToken.id]);
  if (targetUser.rows.length == 0) {
    res.status(401);
    throw new Error('Not authorized: user not found!');
  }

  req.user = targetUser.rows[0];

  postAction();
};

export const auth = (roles = []) => {
  return (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ msg: 'Access denied' });
      }
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ msg: 'Invalid token' });
    }
  };
};

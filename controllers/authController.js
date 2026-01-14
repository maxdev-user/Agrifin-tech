import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Strict',
  maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
};

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
};

export const login = async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('User or password is invalid!');
  }

  const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (user.rows.length == 0) {
    res.status(403);
    throw new Error('You are not authorized to login.');
  }

  const userInfo = user.rows[0];

  const match = await bcrypt.compare(password, userInfo.password_hash);
  if (!match) {
    res.status(403);
    throw new Error('You are not authorized to login.');
  }

  const token = generateToken(userInfo.id);
  res.cookie('token', token, cookieOptions);

  res.status(200).json({message: 'login success', user:{
    id: userInfo.id,
    name: userInfo.name,
    email: userInfo.email,
    role: userInfo.role
  }});
};

export const logout = async (req, res) => {
  res.cookie('token', '', { ...cookieOptions, maxAge: 1});
  res.json({message:'logout success'});
};

export const isAuth = async (req, res) => {
  // logged in user
  res.json(req.user);
};

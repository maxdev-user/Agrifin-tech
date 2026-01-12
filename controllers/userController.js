import express from 'express';
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

// @desc Get all users
// @route GET /api/users
// @access public
export const getUsers = async (req, res) => {
  const users = await pool.query('SELECT * FROM users');
  if (users.rows.length == 0) {
    return res.status(400).json({message: 'No users found.'});
  }

  res.status(200).json({users: users.rows});

};

// @desc Create all users
// @route POST /api/users
// @access public
export const createUser = async (req, res) => {
  const {name, email, password, role} = req.body;
  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error('One or more required fields are missing!');
  }

  const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (userExists.rows.length > 0) {
    res.status(400);
    throw new Error('User already exists!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await pool.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, hashedPassword, role]
  );

  const token = generateToken(newUser.rows[0].id);
  res.cookie('token', token, cookieOptions);

  res.status(201).json({user: newUser.rows[0]});
};

// @desc Get user
// @route GET /api/users
// @access public
export const getUser = async (req, res) => {
  const {name, email} = req.body;
  if (!name || !email) {
    res.status(400);
    throw new Error('One or more required fields are missing!');
  }
  const theUser = await pool.query('SELECT * FROM users WHERE name = $1 AND email = $1', [name, email]);
  if (theUser.rows.length == 0) {
    res.status(400);
    throw new Error('User not found!');
  }

  res.status(200).json({user: theUser.rows[0]});
};

// @desc Update user
// @route PUT /api/users
// @access public
export const updateUser = (req, res) => {
  // @TODO
  res.status(202).json({message:`Update user for ${req.params.id}`});
};

// @desc Dete user
// @route DELETE /api/users
// @access public
export const deleteUser = (req, res) => {
  // TODO
  res.status(203).json({message:`User deleted for ${req.params.id}`});
};

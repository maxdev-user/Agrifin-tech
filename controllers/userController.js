import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';

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
    res.status(403);
    throw new Error('User already exists!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await pool.query(
    'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
    [name, email, hashedPassword, role]
  );

  res.status(201).json({user: newUser.rows[0]});
};

// @desc Get user
// @route GET /api/user
// @access public
export const getUser = async (req, res) => {
  const {id} = req.params;
  if (!id) {
    res.status(400);
    throw new Error('The required Id field is missing!');
  }

  const theUser = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  if (theUser.rows.length == 0) {
    res.status(404);
    throw new Error('User not found!');
  }

  res.status(200).json({user: theUser.rows[0]});
};

// @desc Update user
// @route PUT /api/users
// @access public
export const updateUser = async (req, res) => {
  const {id} = req.params;
  const {name, email, password, role} = req.body;
  if (!id || !name || !email || !password || !role) {
    res.status(400);
    throw new Error('One or more required fields are missing!');
  }

  const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  if (user.rows.length == 0) {
    res.status(404);
    throw new Error('User not found!');
  }

  const pwdhash = await bcrypt.hash(password, 10);
  const updatedUser = await pool.query(
    'UPDATE users SET name = $2, email = $3, password_hash = $4, role = $5 WHERE id = $1 RETURNING id, name, email, role',
    [id, name, email, pwdhash, role]
  );

  res.status(202).json({user: updatedUser.rows[0]});
};

// @desc Dete user
// @route DELETE /api/users
// @access public
export const deleteUser = async (req, res) => {
  const {id} = req.params;
  if (!id) {
    res.status(400);
    throw new Error('The required Id is missing!');
  }

  const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  if (user.rows.length == 0) {
    res.status(404);
    throw new Errow('User not found!');
  }

  const deletedUser = await pool.query('DELETE FROM users WHERE id = $1 RETURNING name, email, role', [id]);

  res.status(202).json({user: deletedUser.rows[0]});
};

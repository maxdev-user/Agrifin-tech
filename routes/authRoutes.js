import express from 'express';
import { login, logout, isAuth } from '../controllers/authController.js';
import { secure } from '../middleware/auth.js';

const authRouter = express.Router();

authRouter.route('/login').post(login);
authRouter.route('/logout').post(logout);
authRouter.get('/me', secure, isAuth);

export default authRouter;

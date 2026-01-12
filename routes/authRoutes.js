import express from 'express';
const authRouter = express.Router();
import { isAuth, setAuth, delAuth } from '../controllers/authController.js';

authRouter.route('/').get(isAuth);
authRouter.route('/').get(isAuth);
authRouter.route('/').post(setAuth);
authRouter.route('/:id').delete(delAuth);

export default authRouter;

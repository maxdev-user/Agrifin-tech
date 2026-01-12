import express from 'express';
const farmerRouter = express.Router();
import { getFarmers, createFarmer, getFarmer, updateFarmer, deleteFarmer } from '../controllers/farmerController.js';

farmerRouter.route('/').get(getFarmers);
farmerRouter.route('/').post(createFarmer);
farmerRouter.route('/:id').get(getFarmer);
farmerRouter.route('/:id').put(updateFarmer);
farmerRouter.route('/:id').delete(deleteFarmer);

export default farmerRouter;

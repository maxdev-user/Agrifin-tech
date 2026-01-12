import express from 'express';
const router = express.Router();
import { getContracts, createContract, getContract, updateContract, deleteContract } from '../controllers/contractController.js';

router.route('/').get(getContracts);
router.route('/').post(createContract);
router.route('/:id').get(getContract);
router.route('/:id').put(updateContract);
router.route('/:id').delete(deleteContract);

export default router;

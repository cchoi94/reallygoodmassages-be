import express from 'express';
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/users.controller';
const router = express.Router();

router
  .route('/')
  .post(createUser)
  .put(updateUser);

router
  .route('/:vendorId')
  .get(getUser)
  .delete(deleteUser);

export default router;

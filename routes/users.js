import express from 'express';
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/users.controller';
const router = express.Router();

router.route('/').post(createUser);

router
  .route('/:cognitoId')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

export default router;

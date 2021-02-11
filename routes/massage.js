import express from 'express';
import {
  createMassage,
  getMassage,
  updateMassage,
  deleteMassage,
} from '../controllers/massages.controller';
const router = express.Router();

router.route('/').post(createMassage);

router
  .route('/:massageId')
  .get(getMassage)
  .put(updateMassage)
  .delete(deleteMassage);

export default router;



import express from 'express';
import { checkIfAuth } from '../../middleware/checkUserAuth';

const router = express.Router();

import controller from '../controllers';

router.get('/all',controller.getAllTaxreport);

router.get('/',checkIfAuth, controller.getTaxreport);

router.post('/', checkIfAuth, controller.addTaxreport);

router.patch('/:taxreportId', controller.editTaxreport);

router.delete('/:taxreportId', controller.deleteTaxreport);



export default router;



import express from 'express';

const router = express.Router();

import controller from '../controllers';


router.get('/',controller.getTaxreport);

router.post('/',controller.addTaxreport);

router.patch('/:faqId', controller.editTaxreport);

router.delete('/:faqId', controller.deleteTaxreport);



export default router;

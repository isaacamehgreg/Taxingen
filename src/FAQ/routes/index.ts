

import express from 'express';

const router = express.Router();

import controller from '../controllers';


router.get('/',controller.getFaq);

router.post('/',controller.addFaq);

router.patch('/:faqId', controller.editFaq);

router.delete('/:faqId', controller.deleteFaq);



export default router;

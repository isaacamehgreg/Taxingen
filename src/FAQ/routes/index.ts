

import express from 'express';
import { checkIfAdmin } from '../../middleware/adminRoleValidation';
import { checkIfAuth } from '../../middleware/checkUserAuth';

const router = express.Router();

import controller from '../controllers';




router.get('/',controller.getFaq);

router.post('/',checkIfAuth, checkIfAdmin,controller.addFaq);

router.patch('/:faqId',checkIfAuth, checkIfAdmin, controller.editFaq);

router.delete('/:faqId',checkIfAuth, checkIfAdmin, controller.deleteFaq);



export default router;

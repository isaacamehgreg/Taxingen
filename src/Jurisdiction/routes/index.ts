

import express from 'express';
import { checkIfAdmin } from '../../middleware/adminRoleValidation';
import { checkIfAuth } from '../../middleware/checkUserAuth';

const router = express.Router();

import controller from '../controllers';


router.get('/',controller.getJurisdiction);

router.get('/search/',controller.searchJurisdiction);

router.post('/',controller.addJurisdiction);

router.patch('/:jurisId',checkIfAuth, checkIfAdmin, controller.editJurisdiction);

router.delete('/:jurisId',checkIfAuth, checkIfAdmin, controller.deleteJurisdiction);



export default router;

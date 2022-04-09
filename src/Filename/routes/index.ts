

import express from 'express';
import { checkIfAdmin } from '../../middleware/adminRoleValidation';
import { checkIfAuth } from '../../middleware/checkUserAuth';

const router = express.Router();

import controller from '../controllers';


router.get('/',controller.getFilename);

router.post('/', controller.addFilename);

router.post('/twelvemonth', controller.add12MonthFilename);

router.patch('/:filenameId', checkIfAuth, checkIfAdmin, controller.editFilename);

router.delete('/:filenameId',checkIfAuth, checkIfAdmin, controller.deleteFilename);



export default router;

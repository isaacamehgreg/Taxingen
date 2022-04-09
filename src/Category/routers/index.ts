

import express from 'express';

const router = express.Router();

import controller from '../controllers';

import {checkIfAuth} from '../../middleware/checkUserAuth'
import { checkIfAdmin } from '../../middleware/adminRoleValidation';



router.get('/',controller.getCategory);

router.post('/',checkIfAuth, checkIfAdmin, controller.addCategory);

router.patch('/:catId', checkIfAuth, checkIfAdmin,checkIfAuth ,controller.editCategory);

router.delete('/:catId',checkIfAuth, checkIfAdmin, checkIfAuth, controller.deleteCategory);



export default router;

import express from 'express';
import { checkIfAuth } from '../../middleware/checkUserAuth';
import UserController from '../controllers/index';
import {
	validateUpdateFields,
	validateUpdatePasswordFields,
} from '../../middleware/authValidation';
import { checkAdmin } from 'src/middleware/adminRoleValidation';
const router = express.Router();

// router.get('', UserController.createUser.bind(UserController));

/**
 * Get User Info
 */

router.get('/', UserController.getAllUser);
router.get('/:user_id',  UserController.getUser);
router.patch('/:user_id', UserController.editUser);
router.delete('/:user_id', UserController.deleteUser);






export default router;

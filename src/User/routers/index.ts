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
router.get('/', checkIfAuth, UserController.getUser);






export default router;

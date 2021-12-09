import express from 'express';
import { checkIfAuth } from '../../middleware/checkUserAuth';
import RoleController from '../controllers/index';
import { checkAdmin } from '../../middleware/adminRoleValidation';
import { updateRoleValidation } from '../../middleware/updateRoleValidation';
const router = express.Router();

/**
 * Get user role
 */
router.get('/', checkIfAuth, RoleController.getRole);

/**
 * Update user role
 */
router.patch(
	'/update',
	[checkIfAuth, checkAdmin, updateRoleValidation],
	RoleController.updateRole
);

export default router;

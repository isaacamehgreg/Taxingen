import { NextFunction, Request, Response } from 'express';
import { updateUserRole } from '../services/updateUserRole';
import httpStatus from 'http-status';
import { SuccessResponse } from '../../utils/success-response';
import { getUserRole } from '../services/getUserRole';

class RoleController {
	async getRole(req: Request, res: Response, next: NextFunction) {
		const id = res.locals.user.id;
		try {
			const role = await getUserRole(id);
			return res
				.status(httpStatus.OK)
				.json(new SuccessResponse('User role fetched successfully', role));
		} catch (error) {
			next(error);
		}
	}

	async updateRole(req: Request, res: Response, next: NextFunction) {
		const { userId, role } = req.body;
		try {
			await updateUserRole(userId, role);
			return res
				.status(httpStatus.OK)
				.json(new SuccessResponse('User role updated successfully', null));
		} catch (error) {
			next(error);
		}
	}
}

export default new RoleController();

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { SuccessResponse } from '../../utils/success-response';
import { forbiddenError } from '../../utils/exceptions';
import { getNotification } from '../services/getNotification';
import { createNotification } from '../services/createNotification';

const getUserNotification = async (req: Request, res: Response) => {
	const id = res.locals.user.id;
	try {
		const notifications = await getNotification(id);
		return res
			.status(httpStatus.OK)
			.json(
				new SuccessResponse(
					'User notifications fetched successfully',
					notifications
				)
			);
	} catch (error) {
		return res.status(forbiddenError().status).json(forbiddenError().response);
	}
};

const createUserNotification = async (req: Request, res: Response) => {
	const id = res.locals.user.id;
	const description = req.body.description;
	try {
		const notifications = await createNotification(id, description);
		return res
			.status(httpStatus.OK)
			.json(
				new SuccessResponse(
					'User notifications created successfully',
					notifications
				)
			);
	} catch (error) {
		return res.status(forbiddenError().status).json(forbiddenError().response);
	}
};

export { getUserNotification, createUserNotification };

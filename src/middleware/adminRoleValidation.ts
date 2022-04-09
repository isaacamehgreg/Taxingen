import { NextFunction, Request, Response } from 'express';

export const checkIfAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = res.locals.user;
	if (!user) {
		return res.status(401).json({
			status: 'error',
			message: 'Please log in first',
			data: null,
		});
	}

	if (user.role != 'admin') {
		return res.status(401).json({
			status: 'error',
			message: 'You do not have permission',
			data: null,
		});
	}

	next();
};

import { Request, Response, NextFunction } from 'express';
import { jwtConfig } from '../config/config';
import * as jsonwebtoken from 'jsonwebtoken';
import { User } from '../User/user.entity';

const checkIfAuth = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(' ')[1];

	if (token) {
		jsonwebtoken.verify(token, jwtConfig.jwtSecret, async (error, decoded) => {
		
			if (error) {
				return res.status(401).json({
					status: 'error',
					message: 'User not authorized',
					data: null,
				});
			} else {
				const email = decoded?.email;
				res.locals.user = await User.findOne({ email });
				next();
			}
		});
	} else {
		return res.status(401).json({
			status: 'error',
			message: 'provide the token first or proceed from your email',
			data: null,
		});
	}
};

export { checkIfAuth };

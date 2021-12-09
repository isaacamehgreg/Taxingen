import { jwtConfig } from '../config/config';
import { User } from '../User/user.entity';
import * as jwt from 'jsonwebtoken';

const generateToken = (user: User) =>
	new Promise((resolve, reject) => {
		const time = new Date().getTime();
		const expireTime = Math.floor(
			(time + Number(jwtConfig.jwtExpireTime)) * 1000
		).toString();
		try {
			jwt.sign(
				{
					email: user.email,
				},
				jwtConfig.jwtSecret,
				{
					algorithm: 'HS256',
					expiresIn: expireTime,
				},
				(error, token) => {
					if (error) {
						reject(error);
					}
					resolve(token);
				}
			);
		} catch (e) {
			reject(e);
		}
	});

export default generateToken;

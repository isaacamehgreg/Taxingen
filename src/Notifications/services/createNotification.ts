import { getRepository } from 'typeorm';
import { Notifications } from '../notifications.entity';

export const createNotification = async (id: number, description: string) => {
	const notificationRepo = getRepository(Notifications);
	if (!description) {
		throw 'Notification description cannot be empty';
	}

	const notification = await notificationRepo
		.create({
			userId: id,
			description: description,
		})
		.save();

	if (!notification) {
		throw 'An error occurred while creating notification';
	}

	return notification;
};

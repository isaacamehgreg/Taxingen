import { getRepository } from 'typeorm';
import { Notifications } from '../notifications.entity';

export const getNotification = async (id: number) => {
	const notificationRepo = getRepository(Notifications);

	const notifications = await notificationRepo.find({ userId: id });

	if (!notifications) {
		throw 'Error occurred while fetching notifications';
	}

	if (!notifications.length) {
		throw 'User does not have any notification';
	}
	return notifications;
};

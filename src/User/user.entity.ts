import { IsEmail, IsInt } from 'class-validator';
// import { NotificationsSettings } from '../Settings/settings.entity';

import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
	OneToMany,
} from 'typeorm';
import { Notifications } from '../Notifications/notifications.entity';


@Entity('user')
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	first_name!: string;

	@Column()
	last_name!: string;

	@Column({
		unique: true,
		nullable: true,
	})
	//@IsEmail()
	email!: string;

	@Column({
		nullable: true,
		unique: true
	})
	phone!: string;

	@Column({
		nullable: true,
		unique: true
	})
	social_id!: string;

	@Column({
		nullable: true,
	})
	social_media!: string;


	@Column({
		nullable: true,
	})
	profile_picture!: string;

	@Column({
		nullable: true,
		unique: true
	})
	country!: string;

	@Column({
		nullable: true,
		unique: true
	})
	state!: string;

	@Column({
		nullable: true,
		unique: true
	})
    timezone!: string;


	@Column({
		default: 'free-user',
	})
	role!: string;




	@Column({
		nullable: true,
	})
	email_verified_at!: Date;

	@Column({ select: false })
	password!: string;

	// @OneToOne(() => Wallets, (wallet) => wallet.user)
	// wallet!: Wallets;



	@OneToMany(() => Notifications, (notifications) => notifications.user)
	notifications!: Notifications[];

	// @OneToOne(() => NotificationsSettings, (notificationsSettings) => notificationsSettings.user)
	// notificationsSettings!: NotificationsSettings;


	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;
}


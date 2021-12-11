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



@Entity('user')
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	name!: string;

	@Column()
	title!: string;

	@Column({
		unique: true,
	})
	//@IsEmail()
	email!: string;

	@Column({
		unique: true
	})
	phone!: string;

	@Column({
		nullable: true,
	})
	email_verified_at!: Date;

	@Column({
		unique: true
	})
	code!: string;

	

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;
}


import { User } from '../User/user.entity';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('notifications')
export class Notifications extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	userId!: number;
	@ManyToOne(() => User, (user) => user.notifications)
	@JoinColumn({
		name: 'userId',
	})
	user!: User;

	@Column({
		default: false,
	})
	description!: string;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;
}

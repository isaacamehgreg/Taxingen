import { User } from '../User/user.entity';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('settings')
export class Settings extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		default:true,
		nullable:true
	})
	app_private_file_requeste!: Boolean;

	@Column({
		default:true,
		nullable:true
	})
	app_invitation_requeste!: Boolean;

	@Column({
		default:false,
		nullable:true
	})
	app_action!: Boolean;

	@Column({
		default:true,
		nullable:true
	})
	app_referal!: Boolean;

	@Column({
		default:true,
		nullable:true
	})
	app_payment_reminder!: Boolean;
//....................................//
	@Column({
		default:true,
		nullable:true
	})
	email_private_file_requeste!: Boolean;

	@Column({
		default:true,
		nullable:true
	})
	email_invitation_requeste!: Boolean;

	@Column({
		default:false,
		nullable:true
	})
	email_action!: Boolean;

	@Column({
		default:true,
		nullable:true
	})
	email_referal!: Boolean;

	@Column({
		default:true,
		nullable:true
	})
	email_payment_reminder!: Boolean;


	// @OneToOne(()=>User, user => user.notificationsSettings)
    // @JoinColumn()
	// user!: User;

	

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;
}


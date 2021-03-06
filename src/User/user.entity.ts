import { IsEmail, IsInt } from 'class-validator';
import { Taxreport } from '../Taxreport/taxreport.entities';
import {Filename} from "../Filename/filename.entities"

import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
	OneToMany,
	ManyToOne
} from 'typeorm';



@Entity('user')
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	first_name!: string;

	@Column()
	last_name!: string;

	@Column()
	title!: string;

	@Column({
		unique: true,
	})
	email!: string;

	@Column({
		nullable: true,
	})
	role!: string;

	@Column({
		nullable: true,
	})
	password!: string

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

	@Column({
		nullable: true,
	})
	company_name!: string;

	@Column({
		nullable: true,
	})
	company_address!: string;

	@Column({
		nullable: true,
	})
	company_city!: string;

	@Column({
		nullable: true,
	})
	company_state!: string;

	@Column({
		nullable: true,
	})
	company_postal_code!: string;

	@Column({
		nullable: true,
	})
	company_country!: string;

	// @ManyToOne(() =>Taxreport,taxreport=>taxreport.user)
	// taxreport!:Taxreport

	@OneToMany(()=>Filename, filename=>filename.jurisdiction,{onDelete:"CASCADE"})
	filename!: Filename[]

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;
}


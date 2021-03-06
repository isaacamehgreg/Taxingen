import { Taxreport } from '../Taxreport/taxreport.entities';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
	OneToMany,
	ManyToOne,
} from 'typeorm';
import { Jurisdiction } from '../Jurisdiction/jurisdiction.entities';
import{ User} from '../User/user.entity'
@Entity('filename')
export class Filename extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    name!:string;

	@ManyToOne(() =>User,user=>user.filename,{onDelete:"CASCADE"})
	user!:User

	@ManyToOne(() =>Jurisdiction,jurisdiction=>jurisdiction.filename,{onDelete:"CASCADE"})
	jurisdiction!:Jurisdiction

    @Column()
    period!:number;

	@Column({
		default:false
	})
	isAccepted!:boolean;

	@Column({
		default:false, 
		nullable:true
	})
    isEmailSent!:boolean;

	@Column()
    created_at!: string;

	@Column()
    expiration_date!: string;


}

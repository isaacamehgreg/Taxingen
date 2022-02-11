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

	@ManyToOne(() =>User,user=>user.filename)
	user!:User

	@ManyToOne(() =>Jurisdiction,jurisdiction=>jurisdiction.filename)
	jurisdiction!:Jurisdiction

    @Column()
    period!:number;

	@Column({default:false, nullable:true})
    isEmailSent!:boolean;


	// @ManyToOne(() =>Taxreport,taxreport=>taxreport.filename)
	// taxreport!:Taxreport
}

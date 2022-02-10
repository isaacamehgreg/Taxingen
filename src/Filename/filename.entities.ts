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
@Entity('filename')
export class Filename extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    name!:string;

	@ManyToOne(() =>Jurisdiction,jurisdiction=>jurisdiction.filename)
	jurisdiction!:Jurisdiction


	// @ManyToOne(() =>Taxreport,taxreport=>taxreport.filename)
	// taxreport!:Taxreport
}

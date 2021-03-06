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
	ManyToOne
} from 'typeorm';
import { Filename } from '../Filename/filename.entities';
@Entity('jusrisdiction')
export class Jurisdiction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    name!:string;

	@OneToMany(()=>Filename, filename=>filename.jurisdiction)
	filename!: Filename[]


	// @ManyToOne(() =>Taxreport,taxreport=>taxreport.jurisdiction)
	// taxreport!:Taxreport

}

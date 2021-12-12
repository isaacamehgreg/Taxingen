import { Jurisdiction } from 'src/Jurisdiction/jurisdiction.entities';
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
@Entity('Taxreports')
export class Taxreport extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!:number | string;

    @Column()
    jurisdictionId!:string | number;

    @Column()
    filename!:string;
}

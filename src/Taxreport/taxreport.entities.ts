import { Jurisdiction } from '../Jurisdiction/jurisdiction.entities';
import { Filename } from '../Filename/filename.entities';
import { Entity, Column, PrimaryGeneratedColumn,BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
	OneToMany,
} from 'typeorm';
import { User } from '../User/user.entity';
import { filing_period } from '../config/client';

@Entity('taxreport') //filings
export class Taxreport extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    // @OneToMany( () => Jurisdiction, jurisdiction=>jurisdiction.taxreport)
	// jurisdiction!: Jurisdiction[]

	// @OneToMany( () => Filename, filename=>filename.taxreport)
	// filename!: Filename[]

	// @OneToMany( () => User, user=>user.taxreport)
	// created_by!: User[]

	// @OneToMany( () => User, user=>user.taxreport)
	// filed_by!: User[]

	@Column()
	
	

    @Column({
		default:filing_period.SIX_MONTH
	})
	period!: string;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;
}



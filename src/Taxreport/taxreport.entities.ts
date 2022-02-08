
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
@Entity('taxreport')
export class Taxreport extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    jurisdictionId!: string;

	@Column()
    jurisdiction!: string;

    @Column()
    filename!: string;

	@Column()
    userId!: string;

	@Column()
    company!: string;

	@Column()
    companyId!: number;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;
}



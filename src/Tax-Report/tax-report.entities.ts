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
@Entity('tax-reports')
export class TaxReport extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    jurisdiction!:string;

    @Column()
    filename!:string;

}

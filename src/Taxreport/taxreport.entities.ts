
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
    id!:number;

    @Column()
    jurisdictionId!: string;

    @Column()
    filename!:string;
}

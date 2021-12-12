import { Category } from '../Category/categories.entities';
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
	JoinColumn,
} from 'typeorm';
@Entity('faq')
export class Faq extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    question!:string;

	@Column()
    answer!:string;

	@Column()
	catId!: string;

}

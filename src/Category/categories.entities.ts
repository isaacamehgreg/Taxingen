import { Faq } from 'src/FAQ/faq.entities';
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
@Entity('categories')
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!:number | string;

    @Column()
    name!:string;


}

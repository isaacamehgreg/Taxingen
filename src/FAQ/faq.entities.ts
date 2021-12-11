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
@Entity('faq')
export class Faq extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    question!:string;

	@Column()
    answer!:string;

}

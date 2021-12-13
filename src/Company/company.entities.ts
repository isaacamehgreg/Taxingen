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
@Entity('company')
export class Company extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    name!:string;

    @Column()
    address!:string;

	@Column()
    city!:string;

	@Column()
    state!:string;

	@Column()
    postal_code!:string;

	@Column()
    country!:string;

}

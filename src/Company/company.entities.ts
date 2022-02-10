import { User } from '../User/user.entity';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
	OneToMany,
	JoinColumn,
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

	@OneToOne(()=>User,{onDelete :'CASCADE'})
	@JoinColumn()
	user!:User;
	

}

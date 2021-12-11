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
@Entity('jusrisdiction')
export class Jurisdiction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    name!:string;



}

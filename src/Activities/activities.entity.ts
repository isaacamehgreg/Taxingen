import { User } from "../../src/User/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('activities')
export class Activities extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => User)
	
    @JoinColumn()
    user!: User;

    @Column()
    activity!: string

    @CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;

}
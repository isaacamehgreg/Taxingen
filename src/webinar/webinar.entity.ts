
import {  BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('webinar')
export class Webinar extends BaseEntity {
    @PrimaryGeneratedColumn({
        type!:'integer',
    })
    id!:Number

    @Column()
    first_name!:string;

    @Column()
    last_name!:string;

    @Column()
    company!:string;

    @Column()
    email!:string;

    @CreateDateColumn()
    created_at!:Date;

}
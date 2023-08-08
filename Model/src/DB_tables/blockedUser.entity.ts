import {Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, Collection, ManyToMany, OneToMany} from "typeorm";
@Entity()
export class BlockedUser {
    @PrimaryGeneratedColumn()
    BlockedId:Number;
    @Column()
    BlockedById:Number;
};
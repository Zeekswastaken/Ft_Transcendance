import {Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, Collection, ManyToMany, OneToMany} from "typeorm";
@Entity()
export class GameInvite {
    @PrimaryGeneratedColumn()
    id:Number;
    @Column()
    Sender_Id:Number;
    @Column()
    Receiver_Id:Number;
};
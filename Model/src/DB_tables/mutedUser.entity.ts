// import { Channel } from './channel.entity';
import exp from "constants";
import {Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, Collection, ManyToMany, OneToMany, ManyToOne, JoinColumn} from "typeorm";

@Entity()
export class mutedUser {
    @PrimaryGeneratedColumn()
    id:Number;
    // @Column()
    // opponent_id:Number;
    @Column()
    Channel_id
    @Column()
    result:String;
    @Column()
    Date:Date;
}
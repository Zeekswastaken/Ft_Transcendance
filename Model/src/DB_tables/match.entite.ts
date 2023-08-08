import { User } from 'src/DB_tables/user.entities';
import exp from "constants";
import {Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, Collection, ManyToMany, OneToMany, ManyToOne, JoinColumn} from "typeorm";

@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    id:Number;
    @Column()
    UserId:Number;
    @Column()
    opponent_id:Number;
    @Column()
    type:String;
    @Column()
    result:String;
    @Column()
    Date:Date;
}
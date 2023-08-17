import {Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, Collection, ManyToMany, OneToMany, ManyToOne, OneToOne,JoinColumn} from "typeorm";
import {User} from './user.entity'
import { Achievements } from "./achievements.entity";
@Entity()
export class Stats{
    @PrimaryGeneratedColumn()
    id: Number;
    @Column()
    Matches_Played:Number;
    @Column()
    Wins:Number;
    @Column()
    Losses:Number;
    @Column()
    Level:Number;
    @Column()
    Winrate:Number;
    // @Column()
    // Achievement;
    @OneToOne(() => User, user => user.stats)
    @JoinColumn()
    user: User;
    @OneToMany(() => Achievements, achievements => achievements.stats)
    achievements: Achievements[];
}
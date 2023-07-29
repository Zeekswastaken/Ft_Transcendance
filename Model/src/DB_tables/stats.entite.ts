import {Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, Collection, ManyToMany, OneToMany, ManyToOne, JoinColumn} from "typeorm";

@Entity()
export class Stats{
    @PrimaryGeneratedColumn()
    id: Number;
    @Column()
    // @Column()
    // UserId;
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
}
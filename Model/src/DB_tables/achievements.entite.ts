import {Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, Collection, ManyToMany, OneToMany, ManyToOne, JoinColumn} from "typeorm";

@Entity()
export class Achievement {
    @PrimaryGeneratedColumn()
    id:Number;
    @Column()
    icon_URL:String;
    @Column()
    name:String;
}
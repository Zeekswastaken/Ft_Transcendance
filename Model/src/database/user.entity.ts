import {Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, Collection, ManyToMany, OneToMany, ManyToOne, JoinColumn} from "typeorm";
import { ChannelMembership } from "./channelMembership.entity";
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique: true})
    username: String;
    @Column()
    birthday: Date;
    @Column()
    gender: String;
    @Column()
    avatar_URL: String;
    @OneToMany(() => ChannelMembership, membership => membership.user)
  memberships: ChannelMembership[];
}

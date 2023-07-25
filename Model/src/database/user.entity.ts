import {Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, Collection, ManyToMany, OneToMany, ManyToOne, JoinColumn} from "typeorm";
import { ChannelMembership } from "./channelMembership.entity";
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique: true})
    username: string;
    @Column()
    birthday: Date;
    @Column()
    gender: string;
    @Column()
    avatar_URL: string;
    @OneToMany(() => ChannelMembership, membership => membership.user)
  memberships: ChannelMembership[];
}

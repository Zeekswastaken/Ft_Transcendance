
import {Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, Collection, ManyToMany, OneToMany, ManyToOne, JoinColumn} from "typeorm";
// import { ChannelMembership } from "./channelMembership.entity";
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: Number;
    @Column({unique: true})
    username: String;
    @Column()
    birthDay: Date;
    @Column()
    password:String;
    @Column()
    gender: String;
    @Column({default:true})
    privacy:Boolean;
    @Column({nullable:true})
    Bio:String;
    @Column()
    avatar_URL: String;
    // @OneToMany(() => ChannelMembership, membership => membership.user)
  // memberships: ChannelMembership[];
}

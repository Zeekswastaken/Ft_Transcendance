import {Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, Collection, ManyToMany, OneToMany} from "typeorm";
import { ChannelMembership} from './channelMembership.entity'
@Entity()
export class Channel {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    Name: String;
    @Column()
    Type:String;
    @Column({nullable: true})
    Password:String;
    @OneToMany(() => ChannelMembership, ChannelMembership => ChannelMembership.Channelid)
    memberships: ChannelMembership[];
}

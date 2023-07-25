import {Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, Collection, ManyToMany, OneToMany} from "typeorm";
import { ChannelMembership} from './channelMembership.entity'
@Entity()
export class Channel {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    Name: string;
    @Column()
    Type:string;
    @Column({nullable: true})
    Password:string;
    @OneToMany(() => ChannelMembership, ChannelMembership => ChannelMembership.Channelid)
    memberships: ChannelMembership[];
}

import {Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, Collection, ManyToMany, OneToMany, ManyToOne, JoinColumn} from "typeorm";
import { Channel } from './channel.entity'
import { User } from './user.entity'
@Entity()
export class ChannelMembership {
    @PrimaryGeneratedColumn()
    Userid: number;
    @Column()
    Channelid: number;
    @Column()
    Type:string;
    @ManyToOne(() => Channel, channel => channel.memberships)
    @JoinColumn({ name: 'Channelid', referencedColumnName: 'id'})
    channel: Channel;
    @ManyToOne(() => User, user => user.memberships)
    @JoinColumn({ name: 'Userid', referencedColumnName: 'id'})
    user: User;
}

// import {Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, Collection, ManyToMany, OneToMany, ManyToOne, JoinColumn} from "typeorm";
// import { Channel } from './channel.entity'
// import { User } from './user.entities'
// import { Message} from './message.entity'
// @Entity()
// export class ChannelMembership {
//     @PrimaryGeneratedColumn()
//     Userid: Number;
//     @Column()
//     Channelid: Number;
//     @Column()
//     Type:String;
//     @Column({default: false})
//     isMuted:Boolean
//     @Column({default: false})
//     isBanned:Boolean
//     @Column({type: 'timestamp', default: null, nullable: true })
//     muteEndDate:Date
//     @Column({type: 'timestamp', default: null, nullable: true })
//     banEndDate:Date
//     @ManyToOne(() => Channel, channel => channel.memberships)
//     @JoinColumn({ name: 'Channelid', referencedColumnName: 'id'})
//     channel: Channel;
//     @ManyToOne(() => User, user => user.memberships)
//     @JoinColumn({ name: 'Userid', referencedColumnName: 'id'})
//     user: User;
//     @OneToMany(() => Message, message => message.membership)
//     messages: Message[];
// }
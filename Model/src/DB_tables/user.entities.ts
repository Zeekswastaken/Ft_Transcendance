
import {Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, Collection, ManyToMany, OneToMany, ManyToOne, JoinColumn} from "typeorm";
// import { ChannelMembership } from "./channelMembership.entity";
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: Number;
    @Column({unique: true})
    username: String;
    @Column({nullable:true})
    birthDay: Date;
    @Column({default:'Oauth'})
    password:String;
    @Column({nullable:true})
    gender: String;
    @Column({default:true})
    privacy:Boolean;
    @Column({nullable:true})
    Bio:String;
    @Column({default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZqtgZ2eW2F2HvvFOq9Rs0kVWiWJL7pQbA5g&usqp=CAU"})
    avatar_URL: String;
    // @OneToMany(() => ChannelMembership, membership => membership.user)
  // memberships: ChannelMembership[];
}

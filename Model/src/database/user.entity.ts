import {Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, Collection, ManyToMany, JoinTable,OneToMany, ManyToOne, JoinColumn, OneToOne} from "typeorm";
import { ChannelMembership } from "./channelMembership.entity";
import { Stats } from "./stats.entity";
import { GameInvite } from "./gameInvite.entity";
import { Match } from "./match.entity";
import { BlockedUser } from "./blockedUser.entity";
@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id: number;
  @Column({unique: true})
  username: String;
  @Column({type: 'date', nullable: true })
  birthday: Date;
  @Column()
  email: String;
  @Column()
  gender: String;
  @Column({default:'Oauth'})
  password: String;
  @Column({default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZqtgZ2eW2F2HvvFOq9Rs0kVWiWJL7pQbA5g&usqp=CAU'})
  avatar_URL: String;
  @OneToMany(() => ChannelMembership, membership => membership.user)
  memberships: ChannelMembership[];
  @ManyToMany(() => User, user => user.friends)
  @JoinTable({ name: 'userFriends' })
  friends: User[];
  @OneToOne(() => Stats, stats => stats.user)
  @JoinColumn()
  stats: Stats;
  @OneToMany(() => GameInvite, invite => invite.sender, { cascade: true, onDelete: 'CASCADE' })
  sentInvites: GameInvite[];
  @OneToMany(() => GameInvite, invite => invite.receiver, { cascade: true, onDelete: 'CASCADE' })
  receivedInvites: GameInvite[];
  @OneToMany(() => Match, (matchHisory) => matchHisory.player1, { cascade: true, onDelete: 'CASCADE' })
  public player1: Match[];
  @OneToMany(() => Match, (matchHisory) => matchHisory.player2, { cascade: true, onDelete: 'CASCADE' })
  public player2: Match[];
  @OneToMany(() => BlockedUser, blockedUser => blockedUser.blockedBy)
  blockedUsers: BlockedUser[]; //USERS THAT GOT BLOCKED
  @OneToMany(() => BlockedUser, blockedUser => blockedUser.blockedUser)
  usersBlocked: BlockedUser[]; //USERS THAT BLOCKED
}

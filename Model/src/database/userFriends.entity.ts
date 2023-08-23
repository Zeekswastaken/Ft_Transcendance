import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_friends' })
export class UserFriends {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  status: String;

  @ManyToOne(() => User, user => user.friendsassender, { eager: true })
  @JoinColumn({ name: 'senderid' })
  sender: User; // Store only the id of the sender

  @ManyToOne(() => User, user => user.friendsasreceiver, { eager: true })
  @JoinColumn({ name: 'receiverid' })
  receiver: User;
}

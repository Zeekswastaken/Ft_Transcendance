import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_friends' })
export class UserFriends {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  status: String;

  @Column()
  senderid: Number;

  @Column()
  receiverid: Number;
}

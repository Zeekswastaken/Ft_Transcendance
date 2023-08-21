import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_friends' })
export class UserFriends {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  status: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender' })
  sender: User;
  
  @ManyToOne(() => User)
  @JoinColumn({ name: 'receiver' })
  receiver: User;
}

import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_friends' })
export class UserFriends {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'pending' })
  status: string;

  @ManyToOne(() => User, { eager: true})
  @JoinColumn({ name: 'user1_id' }) 
  user1: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user2_id' })
  user2: User;
}
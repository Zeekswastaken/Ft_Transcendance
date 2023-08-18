import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserFriends {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  status: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'User1ID' })
  user1: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'User2ID' })
  user2: User;
}

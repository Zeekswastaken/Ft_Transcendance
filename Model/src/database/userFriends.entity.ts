import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserFriends {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  status: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user1' })
  user1: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user2' })
  user2: User;
}

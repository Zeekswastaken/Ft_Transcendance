import exp from "constants";
import {Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, Collection, ManyToMany, OneToMany, ManyToOne, JoinColumn} from "typeorm";
import {User} from "./user.entities";
@Entity()
export class UserFriends {
    @Column()
    User1ID:Number;
    @Column()
    User2ID:Number;
    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'User1ID' })
    user1: User;
  
    @ManyToOne(() => User, { eager: true }) 
    @JoinColumn({ name: 'User2ID' })
    user2: User;
  
}
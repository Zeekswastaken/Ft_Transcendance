
// @Entity()
// export class User 
// {
//     @Column()
//     @PrimaryGeneratedColumn()
//     id:Number;
//     @Column()
//     email:String;
//     @Column()
//     username:String;
//     @Column({default:'Oauth'})
//     password:String
//     @Column({default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZqtgZ2eW2F2HvvFOq9Rs0kVWiWJL7pQbA5g&usqp=CAU'})
//     image:String;
// }

import {Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, Collection, ManyToMany, OneToMany, ManyToOne, JoinColumn} from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: Number;
    @Column({unique: true,nullable:true})
    username: String;
    @Column({nullable:true})
    birthDay: Date;
    @Column({nullable:true})
    gender: String;
    @Column({default:'Oauth'})
    password: String;
    @Column({default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZqtgZ2eW2F2HvvFOq9Rs0kVWiWJL7pQbA5g&usqp=CAU',nullable:true})
    avatar_URL: String;
}
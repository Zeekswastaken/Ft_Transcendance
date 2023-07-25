import { Entity , PrimaryColumn, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;  
    @Column()
    text: string;
    @Column()
    Sender_id: number;
    @Column()
    Created_at: Date;
}

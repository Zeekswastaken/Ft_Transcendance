import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ChannelMembership } from './channelMembership.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" }) //CHANGE IT LATER
  Created_at: Date;

  @ManyToOne(() => ChannelMembership, membership => membership.messages)
  @JoinColumn({ name: 'Membership_id', referencedColumnName: 'id' })
  membership: ChannelMembership;
}

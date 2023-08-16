import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelMembership } from 'src/database/channelMembership.entity';
import { Repository } from 'typeorm';
import { Equal } from 'typeorm';

@Injectable()
export class ChatService {
    constructor(@InjectRepository(ChannelMembership) private readonly ChannelMRepo:Repository<ChannelMembership>){}
    async getAllRooms(Userid:number){
        const rooms = await this.ChannelMRepo.find({
            where: { Userid: Equal(Userid)} ,relations: ['Channel'],});
            const channelNames = rooms.map(
                membership => membership.channel.Name
            );
        return channelNames;
    }
}
import { Body, Controller, Post, Request, UseGuards, Get } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/createChannel.dto';
import { User } from '../database/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('channel')
export class ChannelController {
    constructor(private readonly channelService: ChannelService) {}
    
    @Post('channel')
    createChannel(@Body() CreateChannelDto : CreateChannelDto, @Request() req: any)
    {
        const user: User = req.user;
        return this.channelService.createChannel(CreateChannelDto, user);
    }

    @Get('allchannels')
    getAllChannels()
    {
        return this.channelService.getAllChannels();
    }

    
}

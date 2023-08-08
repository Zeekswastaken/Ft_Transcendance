import { Channel } from "../../database/Channel.entity";
import { IsNotEmpty, IsString, IsOptional} from 'class-validator'
export class createChannelDto extends Channel{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    type: String;

    @IsOptional()
    @IsString()
    password?: String;

}

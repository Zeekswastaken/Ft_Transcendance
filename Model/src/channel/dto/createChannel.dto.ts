import { Channel } from "../../database/Channel.entity";
import { IsNotEmpty, IsString, IsOptional} from 'class-validator'
export class CreateChannelDto extends Channel{
    @IsNotEmpty()
    @IsString()
    name: String;

    @IsNotEmpty()
    @IsString()
    type: String;

    @IsOptional()
    @IsString()
    password?: String;

}

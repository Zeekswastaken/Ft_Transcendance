import { User } from './user.entity';
import { Achievements } from "./achievements.entity";
export declare class Stats {
    id: Number;
    Matches_Played: Number;
    Wins: Number;
    Losses: Number;
    Level: Number;
    Winrate: Number;
    user: User;
    achievements: Achievements[];
}

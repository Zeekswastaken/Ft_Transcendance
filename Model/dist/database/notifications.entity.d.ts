import { User } from './user.entity';
export declare class Notification {
    id: Number;
    sender: User;
    recipient: User;
    type: String;
    isRead: boolean;
    message: string;
    createdAt: Date;
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../database/user.entity';
import { UserFriends } from '../database/userFriends.entity'; 
import { Notification } from '../database/notifications.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, Equal } from 'typeorm';
import { refCount } from 'rxjs';
@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(UserFriends)
    private readonly userFriendsRepository: Repository<UserFriends>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>
  ) {}
  async create(userid: Number, recipientid: Number) {
    const initiator = await this.userRepository.findOne({where: { id: Equal(userid)}, relations: ['user1Friends', 'user2Friends']});
    const recipient = await this.userRepository.findOne({where: { id: Equal(recipientid)}, relations: ['user1Friends', 'user2Friends'],});
    if (!initiator || !recipient)
      throw new HttpException("User or Recipient not found",HttpStatus.FORBIDDEN);
    const friendship = await this.userFriendsRepository.findOne({where: [{user1: Equal(userid), user2: Equal(recipientid)},{user1: Equal(recipientid), user2: Equal(userid)}]});
    if (friendship)
      throw new HttpException("The friend request has already been sent", HttpStatus.FORBIDDEN);
    const actualFriendship = new UserFriends();
    actualFriendship.user1 = initiator;
    actualFriendship.user2 = recipient;
    actualFriendship.status = "pending";
    initiator.user1Friends.push(actualFriendship);
    recipient.user2Friends.push(actualFriendship);
    await this.userRepository.save(recipient);
    await this.userRepository.save(initiator);
    return await this.userFriendsRepository.save(actualFriendship);
  }

  findAll() {
    return `This action returns all friends`;
  }

  async acceptRequest(userid:Number, recipientid:Number){
    console.log("*****************************************");
    const friendship = await this.userFriendsRepository.findOne({where: {user1: Equal(recipientid), user2: Equal(userid)}})
    if (!friendship)
      throw new HttpException("No request to accept", HttpStatus.FORBIDDEN);
      friendship.status = "accepted";
    await this.userFriendsRepository.save(friendship);
  }

  async refuseRequest(userid:Number, recipientid:Number){
    const friendship = await this.userFriendsRepository.findOne({where: {user1: Equal(userid), user2: Equal(recipientid)}});
    if (!friendship)
      throw new HttpException("No request to accept", HttpStatus.FORBIDDEN);
    await this.userFriendsRepository.remove(friendship);
  }

  async removeFriendship(userid:Number, recipientid:Number)
  {
    const friendship = await this.userFriendsRepository.findOne({where: [{user1: Equal(userid), user2: Equal(recipientid)},{ user1: Equal(recipientid), user2: Equal(userid)}]});
    if (!friendship)
      throw new HttpException("No friendship to remove", HttpStatus.FORBIDDEN);
    await this.userFriendsRepository.remove(friendship);
  }
tar
  async getUserFriendsWithDetails(userid: Number): Promise<{ id: Number, username: String, avatar_url: String }[]> {
    const friendDetails = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect(
        'user.user1Friends',
        'user_friendship',
        'user_friendship.user1 = :userid AND user_friendship.status = \'accepted\''
      )
      .leftJoinAndSelect(
        'user_friendship.user2',
        'friend_user2'
      )
      .leftJoinAndSelect(
        'user.user2Friends',
        'user_friendship2',
        'user_friendship2.user2 = :userid AND user_friendship2.status = \'accepted\''
      )
      .leftJoinAndSelect(
        'user_friendship2.user1',
        'friend_user1'
      )
      .where('user.id = :userid', { userid })
      .select(['friend_user1.id', 'friend_user1.username', 'friend_user1.avatar_url'])
      .addSelect(['friend_user2.id', 'friend_user2.username', 'friend_user2.avatar_url'])
      .getOne();
  
    if (friendDetails) {
      console.log("HIHOHIHOIHOH");
      const friendsWithDetails = [
        ...friendDetails.user1Friends.map(friend => ({
          id: friend.user2.id,
          username: friend.user2.username,
          avatar_url: friend.user2.avatar_url
        })),
        ...friendDetails.user2Friends.map(friend => ({
          id: friend.user1.id,
          username: friend.user1.username,
          avatar_url: friend.user1.avatar_url
        }))
      ];
      console.log("HIHOHIHOI22222222222222222HOH");

      console.log(friendsWithDetails); 
      return friendsWithDetails;
    } else {
      return [];
    }
  }
  
  
  //  async findOne(id: Number): Promise<User>{
  //   return await this.user;
  // }

  // update(id: number, updateFriendDto: UpdateFriendDto) {
  //   return `This action updates a #${id} friend`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} friend`;
  // }
}

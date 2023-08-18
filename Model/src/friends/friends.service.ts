import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../database/user.entity';
import { UserFriends } from '../database/userFriends.entity'; 
import { Notification } from '../database/notifications.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, Equal } from 'typeorm';
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
    const initiator = await this.userRepository.findOne({where: { id: Equal(userid)}});
    const recipient = await this.userRepository.findOne({where: { id: Equal(recipientid)}});
    if (!initiator || !recipient)
      throw new HttpException("User or Recipient not found",HttpStatus.FORBIDDEN);
    const friendship = await this.userFriendsRepository.findOne({where: {user1: Equal(userid), user2: Equal(recipientid)}});
    if (friendship)
      throw new HttpException("The friend request has already been sent", HttpStatus.FORBIDDEN);
    const actualFriendship = new UserFriends();
    actualFriendship.user1 = initiator;
    actualFriendship.user2 = recipient;
    actualFriendship.status = "pending";
    return await this.userFriendsRepository.save(actualFriendship);
  }

  findAll() {
    return `This action returns all friends`;
  }

  async acceptRequest(userid:Number, recipientid:Number){
    const friendship = await this.userFriendsRepository.findOne({where: {user1: Equal(userid), user2: Equal(recipientid)}})
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
    const friendship = await this.userFriendsRepository.findOne({where: {user1: Equal(userid), user2: Equal(recipientid)}});
    if (!friendship)
      throw new HttpException("No friendship to remove", HttpStatus.FORBIDDEN);
    await this.userFriendsRepository.remove(friendship);
  }

  async getUserFriendsWithDetails(userid: Number): Promise<{ id: Number, username: String, avatar_URL: String }[]> {
    const friendDetails = await this.userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect(
      'user.friends',
      'friendship',
      'friendship.user1 = :userid OR friendship.user2 = :userid',
      { userid }
    )
    .select(['user.id', 'user.username', 'user.avatar_URL'])
    .getMany();

    return friendDetails;
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

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
    const initiator = await this.userRepository.findOne({where: { id: Equal(userid)}, relations: ['friendsassender', 'friendsasreceiver']});
    const recipient = await this.userRepository.findOne({where: { id: Equal(recipientid)}, relations: ['friendsassender', 'friendsasreceiver'],});
    if (!initiator || !recipient)
      throw new HttpException("User or Recipient not found",HttpStatus.FORBIDDEN);
      const friendship = await this.userFriendsRepository.findOne({where: [{sender: Equal(userid), receiver: Equal(recipientid)},{sender: Equal(recipientid), receiver: Equal(userid)}]});
    if (friendship)
      throw new HttpException("The friend request has already been sent/accepted", HttpStatus.FORBIDDEN);
    const actualFriendship = new UserFriends();
    actualFriendship.sender = initiator;
    actualFriendship.receiver = recipient;
    actualFriendship.status = "pending";
    await this.userFriendsRepository.save(actualFriendship);
    initiator.friendsassender.push(actualFriendship);
    console.log("-----=-=-=-=-> ", initiator.friendsassender)
    recipient.friendsasreceiver.push(actualFriendship);
    await this.userRepository.save(initiator);
    await this.userRepository.save(recipient);
    console.log("--------------------------> ",recipient.friendsasreceiver[0].receiver);
    return actualFriendship;
  }

  findAll() {
    return `This action returns all friends`;
  }

  async acceptRequest(userid: Number, recipientid: Number) {
    const friendship = await this.userFriendsRepository.findOne({
      where: { sender: Equal(recipientid), receiver: Equal(userid)}, relations: ['receiver', 'sender']});
  if (!friendship) {
      throw new HttpException("No request to accept", HttpStatus.FORBIDDEN);
  }
  const accepting = await this.userRepository.findOne({
      where: { id: Equal(userid) },
      relations: ['friendsasreceiver']
  });
  const waiting = await this.userRepository.findOne({
    where: { id: Equal(recipientid) },
    relations: ['friendsassender']
  });
  if (!accepting || !waiting) {
      throw new HttpException("User not found", HttpStatus.FORBIDDEN);
  }
  console.log("Friendship Receiver ID:", friendship.receiver);
  console.log("Accepting Sender ID:", accepting.friendsasreceiver[0].sender);
  console.log("Waiting Receiver ID", waiting.friendsassender[0].receiver);
  const position = waiting.friendsassender.findIndex(
    (friendship2) => friendship2.id === friendship.id
  );
  waiting.friendsassender[position].status = 'accepted';
  const position2 = accepting.friendsasreceiver.findIndex(
    (friendship2) => friendship2.id === friendship.id
  );
  accepting.friendsasreceiver[position].status = 'accepted';
  friendship.status = 'accepted';
  await this.userFriendsRepository.save(friendship);
  await this.userRepository.save([accepting, waiting]);
}

  

  async refuseRequest(userid:Number, recipientid:Number){
    // const friendship = await this.userFriendsRepository.findOne({where: {sender: Equal(userid), receiver: Equal(recipientid)}});
    // if (!friendship)
    //   throw new HttpException("No request to accept", HttpStatus.FORBIDDEN);
    // await this.userFriendsRepository.remove(friendship);
  }

  async removeFriendship(userid:Number, recipientid:Number)
  {
    // const friendship = await this.userFriendsRepository.findOne({where: [{sender: Equal(userid), receiver: Equal(recipientid)},{ sender: Equal(recipientid), receiver: Equal(userid)}]});
    // if (!friendship)
    //   throw new HttpException("No friendship to remove", HttpStatus.FORBIDDEN);
    // await this.userFriendsRepository.remove(friendship);
  }

  async getUserFriends(userid: Number): Promise<{ id: Number, username: String, avatar_url }[]> {
  //   console.log("Here");
  //   const friendDetails = await this.userRepository
  //   .createQueryBuilder('user')
  //   .leftJoinAndSelect(
  //     'user.friendsassender',
  //     'user_friendship',
  //     'user_friendship.status = \'accepted\' AND (user_friendship.sender = :userid OR user_friendship.receiver = :userid)',
  //     { userid }
  //   )
  //   .leftJoinAndSelect(
  //     'user.friendsasreceiver',
  //     'user_friendship2',
  //     'user_friendship2.status = \'accepted\' AND (user_friendship2.receiver = :userid OR user_friendship2.sender = :userid)',
  //     { userid }
  //   )
  //   .where('user.id = :userid', { userid })
  
  //   const userWithFriendships = await friendDetails.getOne();
  //     console.log("User with friendships", userWithFriendships);

  // if (userWithFriendships) {
  //   console.log("----0-0-0-0-0- ", userWithFriendships.friendsassender[0]);
  //   const friendsWithDetails = [
  //     ...userWithFriendships.friendsassender.map(friendship => ({
  //       id: friendship.receiverid?.id,
  //       username: friendship.receiver?.username,
  //       avatar_url: friendship.receiver?.avatar_url,
  //     })),
  //     ...userWithFriendships.friendsasreceiver.map(friendship => ({
  //       id: friendship.sender?.id,
  //       username: friendship.sender?.username,
  //       avatar_url: friendship.sender?.avatar_url,
  //     })),
  // //   ];
  
  //   console.log("Friend Details:", friendsWithDetails);
  //   return friendsWithDetails;
  // } else {
  //   console.log("No Friend Details found.");
  // }

  return [];
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

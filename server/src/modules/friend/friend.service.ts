import { ApiException } from '../../core/exceptions/api.exception';
import { IUser } from '../user/interfaces/user.interface';
import { User } from '../user/user.entity';
import { Friend } from './friend.entity';
import { Op } from 'sequelize';

class FriendService {
  async addFriend(userId: string, friendUsername: string): Promise<boolean> {
    const friendRecord = await User.findOne({
      where: {
        username: { [Op.like]: friendUsername },
      },
    });

    if (!friendRecord) {
      throw ApiException.BadRequest(`User, with username "${friendUsername}", wasn't found`);
    }

    const userRecord = await User.findOne({ where: { id: userId } });

    if (!userRecord) {
      throw ApiException.BadRequest("User doesn't exist");
    }

    if (friendRecord.id === userId) {
      throw ApiException.BadRequest("You can't add yourself to friends");
    }

    const isRecordExists = await Friend.findOne({ where: { userId, friendId: friendRecord.id } });

    if (isRecordExists) {
      throw ApiException.BadRequest(`You have already added friend "${friendUsername}" to your list`);
    }

    const friendCreated = await Friend.create({
      userId: userRecord.id,
      friendId: friendRecord.id,
    });

    await friendCreated.$set('user', userRecord);

    return true;
  }

  async deleteFriend(userId: string, friendId: string): Promise<boolean> {
    const result = await Friend.destroy({ where: { userId, friendId } });
    return result > 0;
  }

  async getFriends(userId: string): Promise<IUser[]> {
    const friendIds = await this.getFriendIds(userId);

    if (!friendIds.length) {
      return [];
    }

    return await User.findAll({ attributes: ['id', 'username'], where: { id: friendIds } });
  }

  async getFriendIds(userId: string): Promise<string[]> {
    const friends = await Friend.findAll({ attributes: ['friendId'], where: { userId } });
    return friends.map((friend) => friend['friendId']);
  }
}

export const friendService = new FriendService();

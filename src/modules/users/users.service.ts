import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../core/constants';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { username } });
  }

  async findAllByUsername(username: string[]): Promise<User[]> {
    return await this.userRepository.findAll<User>({ where: { username } });
  }

  async findOneById(id: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  async findAll(username: string): Promise<User[]> {
    return await this.userRepository.findAll({
      attributes: ['id', 'username'],
      where: {
        [Op.not]: {
          username,
        },
      },
    });
  }
}

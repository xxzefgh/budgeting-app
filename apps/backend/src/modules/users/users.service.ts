import * as Bluebird from 'bluebird';
import { Injectable } from '@nestjs/common';
import { User, UserLike } from '../../entities';

@Injectable()
export class UsersService {
  findOneById(id: number) {
    return User.findOne({
      where: {
        id
      }
    });
  }

  findOneByUsername(username: string) {
    return User.findOne({
      where: {
        username
      }
    });
  }

  create(username: string, password: string) {
    const user = new User({
      username,
      password
    });

    return user.save();
  }
}

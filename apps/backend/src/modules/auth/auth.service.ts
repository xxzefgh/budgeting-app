import * as Bluebird from 'bluebird';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, HttpException } from '@nestjs/common';
import { User } from '../../entities';
import { AuthCredentials } from './auth.decoders';
import { UsersService } from '../users/users.service';
import { JwtPayload } from '../../shared/jwt-payload';
import { throwIfFalsy } from '../../utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  signIn(user: User) {
    const payload: JwtPayload = { username: user.username };
    const signedPayload = this.jwtService.sign(payload);

    return Promise.resolve({ token: signedPayload });
  }

  register(credentials: AuthCredentials) {
    return bcrypt
      .hash(credentials.password, 10)
      .then(hash => this.usersService.create(credentials.username, hash))
      .then(user => this.signIn(user));
  }

  validateCredentials(credentials: AuthCredentials) {
    return this.usersService
      .findOneByUsername(credentials.username)
      .then(throwIfFalsy(new HttpException('Invalid username', 400)))
      .tap(user =>
        bcrypt
          .compare(credentials.password, user.password)
          .then(throwIfFalsy(new HttpException('Invalid password', 400)))
      )
      .then(user => this.signIn(user));
  }

  validateUser(payload: JwtPayload) {
    return this.usersService.findOneByUsername(payload.username);
  }
}

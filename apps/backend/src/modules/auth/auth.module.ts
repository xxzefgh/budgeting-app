import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtAuthStrategy } from './jwt-auth.strategy';
import { JwtSecretKey } from '../../shared/secrets';

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: JwtSecretKey,
      signOptions: {
        expiresIn: 3600
      }
    }),
    UsersModule
  ],
  providers: [AuthService, JwtAuthStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}

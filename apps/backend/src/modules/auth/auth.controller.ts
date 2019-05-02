import * as Bluebird from 'bluebird';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeCheckPipe } from '../../shared/typecheck.pipe';
import { AuthCredentials, AuthCredentialsCodec } from './auth.decoders';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body(new TypeCheckPipe(AuthCredentialsCodec)) body: AuthCredentials) {
    return this.authService.validateCredentials(body);
  }

  @Post('register')
  register(@Body(new TypeCheckPipe(AuthCredentialsCodec)) body: AuthCredentials) {
    return this.authService.register(body);
  }
}

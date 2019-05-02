import * as Bluebird from 'bluebird';
import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PaymentsService } from './payments.service';
import { CurrentUser } from '../auth/current-user.decorator';
import { CreatePayment, CreatePaymentCodec } from './payments.decoders';
import { TypeCheckPipe } from '../../shared/typecheck.pipe';
import { User } from '../../entities';

@Controller('user-payments')
export class UserPaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  @UseGuards(AuthGuard())
  findAllForUser(@CurrentUser() user: User, @Query('query') query?: string) {
    return this.paymentsService.findAllByUserId(user.id, { query });
  }

  @Post()
  @UseGuards(AuthGuard())
  createForUser(
    @CurrentUser() user: User,
    @Body(new TypeCheckPipe(CreatePaymentCodec)) body: CreatePayment
  ) {
    return this.paymentsService.createForUser(user.id, body);
  }
}

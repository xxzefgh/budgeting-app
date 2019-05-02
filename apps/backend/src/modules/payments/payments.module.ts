import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { UserPaymentsController } from './user-payments.controller';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [PaymentsService],
  exports: [PaymentsService],
  controllers: [PaymentsController, UserPaymentsController]
})
export class PaymentsModule {}

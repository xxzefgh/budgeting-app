import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [DatabaseModule, AuthModule, PaymentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

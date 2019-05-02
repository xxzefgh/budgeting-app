import * as Bluebird from 'bluebird';
import { Controller, Get, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { TypeCheckPipe } from '../../shared/typecheck.pipe';
import { HasIdCodec, HasId } from '../../decoders';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get(':id')
  findPaymentById(@Param(new TypeCheckPipe(HasIdCodec)) params: HasId) {
    return this.paymentsService.findById(params.id);
  }
}

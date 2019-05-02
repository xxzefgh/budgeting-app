import * as IO from 'io-ts';
import { NumberFromString, DateFromString } from '../../decoders';

export const CreatePaymentCodec = IO.type({
  title: IO.string,
  amount: NumberFromString,
  processedAt: DateFromString,
  category: IO.string,
  comment: IO.string
});
export type CreatePayment = IO.TypeOf<typeof CreatePaymentCodec>;

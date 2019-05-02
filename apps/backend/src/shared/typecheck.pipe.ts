import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  HttpException,
} from '@nestjs/common';
import * as IO from 'io-ts';

@Injectable()
export class TypeCheckPipe<T extends IO.Props> implements PipeTransform {
  constructor(private readonly codec: IO.TypeC<T>) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const x = this.codec.decode(value);

    if (x.isLeft()) {
      throw new HttpException('Validation failed', 400);
    } else {
      return x.value;
    }
  }
}

import * as Bluebird from 'bluebird';
import { Op } from 'sequelize';
import { Injectable } from '@nestjs/common';

import { Payment } from '../../entities';
import { CreatePayment } from './payments.decoders';

interface FilterOptions {
  query?: string;
}

@Injectable()
export class PaymentsService {
  private readonly searchableColumns = ['title', 'category', 'comment'];

  findById(paymentId: number): Bluebird<Payment | null> {
    return Payment.findOne({
      where: { id: paymentId }
    });
  }

  findAllByUserId(userId: number, options?: FilterOptions): Bluebird<Payment[]> {
    return Payment.findAll({
      where: Object.assign(
        { userId },
        options && options.query
          ? this.buildSearchQueryObj(options.query, this.searchableColumns)
          : null
      )
    });
  }

  createForUser(userId: number, data: CreatePayment) {
    const payment = new Payment({
      userId,
      ...data
    });

    return payment.save();
  }

  private buildSearchQueryObj(query: string, props: string[]) {
    const queryObj = props
      .map(prop => ({ [prop]: this.createLikeQuery(query) }))
      .reduce((o, c) => Object.assign(o, c), {});

    return { [Op.or]: queryObj };
  }

  private createLikeQuery(query: string) {
    return { [Op.like]: `%${query}%` };
  }
}

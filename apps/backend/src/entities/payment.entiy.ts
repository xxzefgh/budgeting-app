import {
  Table,
  Model,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user.entity';

@Table({ modelName: 'payments' })
export class Payment extends Model<Payment> {
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @Column({ type: DataType.TEXT, allowNull: false })
  title: string;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  amount: number;

  @Column
  category: string;

  @Column({ type: DataType.TEXT })
  comment: string;

  @Column({ allowNull: false })
  processedAt: Date;
}

import { Table, Model, Column } from 'sequelize-typescript';

@Table({ modelName: 'users' })
export class User extends Model<User> {
  @Column({ unique: true })
  username: string;

  @Column
  password: string;
}

export class UserLike {
  id: number;
  username: string;
  password: string;
}

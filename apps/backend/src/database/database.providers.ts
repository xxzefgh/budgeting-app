import { Sequelize } from 'sequelize-typescript';
import { User, Payment } from '../entities';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'pg',
        port: 5432,
        username: 'test',
        password: 'test',
        database: 'test',
      });

      sequelize.addModels([User, Payment]);
      await sequelize.sync();

      return sequelize;
    },
  },
];

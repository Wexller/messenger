import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
import { DEVELOPMENT } from './database.constants';

const nodeEnv = process.env.NODE_EV;
let config = nodeEnv ? databaseConfig[nodeEnv] : databaseConfig[DEVELOPMENT];

const sequelize = new Sequelize(config);
sequelize.addModels([`${__dirname}/../../modules/**/*.entity.ts`]);

export default sequelize;

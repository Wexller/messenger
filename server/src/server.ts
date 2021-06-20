import 'dotenv/config';
import * as express from 'express';
import sequelize from './core/database/database';
import plugins from './plugins';

const app = express();

plugins(app);

app.listen(process.env.SERVER_PORT, async () => {
  await sequelize.sync();
  console.log(`Server running at port ${process.env.SERVER_PORT}`);
});

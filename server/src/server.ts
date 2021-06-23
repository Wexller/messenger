import 'dotenv/config';
import * as express from 'express';
import sequelize from './core/database/database';
import { initPlugins } from './initPlugins';

const app = express();

initPlugins(app);

app.listen(process.env.SERVER_PORT, async () => {
  await sequelize.sync();
  console.log(`Server running at port ${process.env.SERVER_PORT}`);
});

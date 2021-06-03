import { NestFactory } from '@nestjs/core';
import { initAdapters } from './adapters.init';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';
import 'source-map-support/register';

(async () => {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidateInputPipe());

  initAdapters(app);

  await app.listen(process.env.SERVER_PORT);
})();

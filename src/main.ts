import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const appModule = app.get(AppModule);
  await appModule.configureExpress(app);
  await app.listen(3000);
}
bootstrap();

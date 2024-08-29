import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  AppController,
  HumidityAlertController,
} from './controllers/humidity-alert.controller';
import { WeatherAlertService } from './services/weather-alert.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, HumidityAlertController],
  providers: [WeatherAlertService],
})
export class AppModule {
  async configureExpress(app: NestExpressApplication) {
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
  }
}

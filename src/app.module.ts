import { Module } from '@nestjs/common';
import {
  AppController,
  HumidityAlertController,
} from './controllers/humidity-alert.controller';
import { WeatherAlertService } from './services/weather-alert.service';

@Module({
  imports: [],
  controllers: [AppController, HumidityAlertController],
  providers: [WeatherAlertService],
})
export class AppModule {}

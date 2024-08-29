import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Render,
} from '@nestjs/common';
import { WeatherAlertService } from 'src/services/weather-alert.service';
import {
  HumidityAlertDto,
  HumidityAlertUserInfoDto,
  IpLocationDto,
} from 'src/dto/humidity-alert.dto';

@Controller()
export class AppController {
  constructor(private readonly weatherAlertService: WeatherAlertService) {}

  // @Get()
  // @HttpCode(200)
  // getRoot(): string {
  //   return 'Welcome to the Weather Humidity Checker API';
  // }

  @Get()
  @Render('index')
  getHome() {
    return;
  }
}

@Controller('humidity-verifier')
export class HumidityAlertController {
  constructor(private readonly weatherAlertService: WeatherAlertService) {}

  @Get('get-location-from-ip')
  @HttpCode(200)
  async getLocationFromIP(): Promise<IpLocationDto> {
    return this.weatherAlertService.getLocationFromIP();
  }

  @Post('get-user-humidity')
  @HttpCode(200)
  async getUserHumidity(
    @Body() HumidityAlertUserInfoDto: HumidityAlertUserInfoDto,
  ): Promise<{ openWeatherData: HumidityAlertDto; currentCity: string }> {
    const userLat = parseFloat(HumidityAlertUserInfoDto.lat);
    const userLon = parseFloat(HumidityAlertUserInfoDto.lon);

    return this.weatherAlertService.getHumidityData(userLat, userLon);
  }

  @Post('check-humidity')
  @HttpCode(200)
  async checkHumidity(
    @Body() body: { lat: string; lon: string; humidity: string },
  ): Promise<string> {
    const { lat, lon, humidity } = body;

    if (!humidity) {
      throw new BadRequestException('Missing required parameters');
    }

    const userLat = parseFloat(lat);
    const userLon = parseFloat(lon);
    const userHumidity = parseFloat(humidity);

    return this.weatherAlertService.checkHumidity({
      lat: userLat,
      lon: userLon,
      humidity: userHumidity,
    });
  }
}

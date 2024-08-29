import { IsNumber, IsNotEmpty, IsOptional, IsString, IsNumberString } from 'class-validator';

export class IpLocationDto {
  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @IsNumber()
  @IsNotEmpty()
  lon: number;

  @IsString()
  @IsNotEmpty()
  city: string;

  constructor(lat: number, lon: number, city: string) {
    this.lat = lat;
    this.lon = lon;
    this.city = city;
  }
}

export class HumidityAlertDto {
  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @IsNumber()
  @IsNotEmpty()
  lon: number;

  @IsNumber()
  @IsNotEmpty()
  humidity: number;

  constructor(lat: number, lon: number, humidity: number) {
    this.lat = lat;
    this.lon = lon;
    this.humidity = humidity;
  }
}

export class HumidityAlertUserInfoDto {
  @IsOptional()
  @IsNumberString()
  lat: string;

  @IsOptional()
  @IsNumberString()
  lon: string;

  @IsString()
  @IsNotEmpty()
  humidity: string;

  constructor(lat: string, lon: string, humidity: string) {
    this.lat = lat;
    this.lon = lon;
    this.humidity = humidity;
  }
}

import {
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumberString,
} from 'class-validator';

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
}

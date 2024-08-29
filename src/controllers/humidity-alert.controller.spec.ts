import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { HumidityAlertController } from 'src/controllers/humidity-alert.controller';
import { WeatherAlertService } from 'src/services/weather-alert.service';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('HumidityAlertController', () => {
  let humidityAlertController: HumidityAlertController;

  // TODO: Put your personal API key here to run the tests:
  const personalApiKey = 'your-personal-api-key';
  const latToTest = '-25.42778';
  const lonToTest = '-49.27306';
  const lowerHumidityToTest = '1';
  const higherHumidityToTest = '99';

  beforeAll(() => {
    process.env.OPENWEATHER_API_URL =
      'https://api.openweathermap.org/data/2.5/';
    process.env.OPENWEATHER_API_KEY = personalApiKey;
    process.env.IP_API_URL = 'http://ip-api.com/json/';
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HumidityAlertController],
      providers: [WeatherAlertService],
    }).compile();

    humidityAlertController = app.get<HumidityAlertController>(
      HumidityAlertController,
    );
  });

  describe('getLocationFromIP', () => {
    it('should return the location data from the IP', async () => {
      const result = await humidityAlertController.getLocationFromIP();

      expect(result).toEqual(
        expect.objectContaining({
          lat: expect.any(Number),
          lon: expect.any(Number),
          city: expect.any(String),
        }),
      );
    });
  });

  describe('checkHumidity', () => {
    it('should return a string with the humidity alert message when the humidity is lower than the value informed', async () => {
      const result = await humidityAlertController.checkHumidity({
        lat: latToTest,
        lon: lonToTest,
        humidity: lowerHumidityToTest,
      });

      expect(result).toEqual(
        expect.stringContaining('Alerta: A umidade atual em Curitiba é de ') &&
          expect.stringContaining(
            `%, que é maior que o valor informado de ${lowerHumidityToTest}%.`,
          ),
      );
    });
  });

  describe('checkHumidity', () => {
    it('should return a string with the humidity alert message when the humidity is higher than the value informed', async () => {
      const result = await humidityAlertController.checkHumidity({
        lat: latToTest,
        lon: lonToTest,
        humidity: higherHumidityToTest,
      });

      expect(result).toEqual(
        expect.stringContaining('Alerta: A umidade atual em Curitiba é de ') &&
          expect.stringContaining(
            `%, que está abaixo do limite informado de ${higherHumidityToTest}%.`,
          ),
      );
    });
  });
});

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/first-test')
      .expect(200)
      .expect('Welcome to the Weather Humidity Checker API');
  });
});

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HumidityAlertDto, IpLocationDto } from 'src/dto/humidity-alert.dto';

@Injectable()
export class WeatherAlertService {
  private readonly IP_API_URL = process.env.IP_API_URL;
  private readonly OPENWEATHER_API_URL = process.env.OPENWEATHER_API_URL;
  private readonly OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

  /**
   * FETCH FROM API
   * @description Fetch data from an API
   * @param {string} url - The URL of the API
   * @returns {Promise<any>} The data from the API
   */
  private async fetchFromApi(url: string): Promise<any> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new HttpException(
        `Failed to fetch data. Status code: ${response.status}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return response.json();
  }

  /**
   * HANDLE UNEXPECTED ERROR
   * @description Handle unexpected errors
   * @param {any} error - The error object
   * @param {string} message - The error message
   * @returns {never} The error message
   */
  private handleUnexpectedError(error: any, message: string): never {
    console.error(message, error);

    if (!(error instanceof HttpException)) {
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    throw error;
  }

  /**
   * GET LOCATION FROM IP
   * @description Get the location data from the IP API
   * @returns {Promise<IpLocationDto>} The location data from the IP API
   */
  async getLocationFromIP(): Promise<IpLocationDto> {
    try {
      const data = await this.fetchFromApi(this.IP_API_URL);

      if (!data?.lat || !data?.lon || !data?.city) {
        throw new HttpException(
          `Failed to fetch location data. Please check the IP API response: ${JSON.stringify(data)}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const locationData = new IpLocationDto();
      locationData.lat = data.lat;
      locationData.lon = data.lon;
      locationData.city = data.city;

      return locationData;
    } catch (error) {
      this.handleUnexpectedError(error, 'Error getting location from IP');
    }
  }

  /**
   * GET WEATHER DATA
   * @description Get the humidity data from the OpenWeather API. Remember to put the OpenWeather API key in the .env file
   * @param {number} lat - The latitude
   * @param {number} lon - The longitude
   * @returns {Promise<{ openWeatherData: HumidityAlertDto; currentCity: string }>} The humidity data from the OpenWeather API
   */
  async getHumidityData(
    lat?: number,
    lon?: number,
  ): Promise<{
    openWeatherData: HumidityAlertDto;
    currentCity: string;
  }> {
    const location = await this.getLocationFromIP();
    let userLat: number;
    let userLon: number;

    if (lat && typeof lat === 'number' && lon && typeof lon === 'number') {
      userLat = lat;
      userLon = lon;
    } else {
      userLat = location.lat;
      userLon = location.lon;
    }

    try {
      const data = await this.fetchFromApi(
        `${this.OPENWEATHER_API_URL}weather?lat=${userLat}&lon=${userLon}&appid=${this.OPENWEATHER_API_KEY}`,
      );

      if (!data?.coord?.lat || !data?.coord?.lon || !data?.main?.humidity) {
        throw new HttpException(
          `Failed to fetch weather data. Please check the OpenWeather API response: ${JSON.stringify(data)}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const openWeatherData = new HumidityAlertDto();
      openWeatherData.lat = data.coord.lat;
      openWeatherData.lon = data.coord.lon;
      openWeatherData.humidity = data.main.humidity;

      return {
        openWeatherData: openWeatherData,
        currentCity: data?.name ?? location?.city,
      };
    } catch (error) {
      this.handleUnexpectedError(error, 'Error getting weather data');
    }
  }

  /**
   * CHECK HUMIDITY
   * @description Check the humidity data from the OpenWeather API
   * @param {HumidityAlertDto} userLat - The latitude
   * @param {HumidityAlertDto} userLon - The longitude
   * @param {number} userHumidity - The humidity value
   * @returns {Promise<string>} The humidity alert message
   */
  async checkHumidity({
    lat: userLat,
    lon: userLon,
    humidity: userHumidity,
  }: HumidityAlertDto): Promise<string> {
    if (!userHumidity) {
      throw new HttpException(
        'Please provide a humidity value in the request body',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const { openWeatherData, currentCity } = await this.getHumidityData(
        userLat,
        userLon,
      );

      return this.compareHumidity(openWeatherData, userHumidity, currentCity);
    } catch (error) {
      this.handleUnexpectedError(error, 'Error checking humidity');
    }
  }

  /**
   * COMPARE HUMIDITY
   * @description Compare the humidity data from the OpenWeather API with the user's humidity data
   * @param {HumidityAlertDto} openWeatherData - The humidity data from the OpenWeather API
   * @param {number} userHumidity - The humidity value
   * @param {string} currentCity - The current city
   * @returns {string} The humidity alert message
   */
  private compareHumidity(
    openWeatherData: HumidityAlertDto,
    userHumidity: number,
    currentCity?: string,
  ): string {
    if (openWeatherData.humidity > userHumidity) {
      return `Alerta: A umidade atual${currentCity && ` em ${currentCity}`} é de ${openWeatherData.humidity}%, que é maior que o valor informado de ${userHumidity}%.`;
    } else if (openWeatherData.humidity == userHumidity) {
      return `A umidade atual${currentCity && ` em ${currentCity}`} é de ${openWeatherData.humidity}%, que está dentro do limite informado de ${userHumidity}%.`;
    } else {
      return `Alerta: A umidade atual${currentCity && ` em ${currentCity}`} é de ${openWeatherData.humidity}%, que está abaixo do limite informado de ${userHumidity}%.`;
    }
  }
}

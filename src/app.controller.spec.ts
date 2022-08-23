import { HttpModule, HttpService } from '@nestjs/axios';
import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { DriverService } from './services/driver.service';

describe('AppController', () => {
  let appController: AppController;
  let driverService: DriverService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [{
        provide: 'EVENTS_DRIVER',
        useFactory: () => {
          const httpService: HttpService = new HttpService()
          // here I would use env variables... or I would let the responsability of providing
          // host and base urls to the user... I have'em harcoded for now
          return new DriverService(httpService, 'mock_url', 'api', 'key')
        }
      }, ValidationPipe],
    }).compile();

    appController = app.get<AppController>(AppController);
    driverService = app.get<DriverService>('EVENTS_DRIVER');

  });

  describe('root', () => {
    it('should return [] with 5 elements and ordered by event_type', async () => {

      jest.spyOn(driverService, 'getAllEvents').mockResolvedValue([])

      expect(await appController.getAllEvents(5, 'event_type')).toStrictEqual({
        code: 200,
        message: 'success',
        data: []
      });
    });
  });
});

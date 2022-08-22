// import { HttpModule } from '@nestjs/axios';
// import { ValidationPipe } from '@nestjs/common';
// import { Test, TestingModule } from '@nestjs/testing';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { DriverService } from './services/driver.service';

// describe('AppController', () => {
//   let appController: AppController;

//   beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       imports: [HttpModule],
//       controllers: [AppController],
//       providers: [DriverService, ValidationPipe],
//     }).compile();

//     appController = app.get<AppController>(AppController);
//   });

//   describe('root', () => {
//     it('should return [] with 5 elements', () => {
//       expect(appController.getAllEvents(5)).toBe([]);
//     });
//   });
// });

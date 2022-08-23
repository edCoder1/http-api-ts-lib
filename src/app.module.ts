import { HttpModule, HttpService } from '@nestjs/axios';
import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { DriverService } from './services/driver.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [{
    provide: 'EVENTS_DRIVER',
    useFactory: () => {
      const httpService: HttpService = new HttpService()
      // here I would use env variables... or I would let the responsability of providing
      // host, base urls and creds to the user...
      // I have'em harcoded for now
      return new DriverService(httpService, 'https://platform-interview-test.herokuapp.com', 'api', 'JHgm8A3YWnGDIXrLImMiYk5e3AmK5rDS')
    }
  }, ValidationPipe],
})
export class AppModule {}

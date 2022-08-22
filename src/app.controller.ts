import { Controller, Get, Inject, ParseIntPipe, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { GetAllEventsDTO } from './dtos/getAllEvents.dto';
import { BaseResponse } from './interfaces/HttpResponses.interfce';
import { ZapierEvent } from './interfaces/ZapierEvent.interface';
import { DriverService } from './services/driver.service';



export type GetEventsFields = 'status' | 'id' | 'event_type'

@Controller('events')
export class AppController {
  constructor(
    @Inject('EVENTS_API')
    private readonly driverService: DriverService,
  ) {}

  @Get('all')
  @UsePipes(new ValidationPipe())
  async getAllEvents(@Query() count: number, @Query() orderBy: GetEventsFields): Promise<BaseResponse> {

    console.log({ count, orderBy });
    

    let eventsArray: ZapierEvent[];

    try { 
      eventsArray = await this.driverService.getAllEvents(Number(count), orderBy) as ZapierEvent[];
    } catch (error) {
      console.log({ error });
      
      throw new Error(error);
    }


    const response: BaseResponse = {
      code: 200,
      message: 'success',
      data: eventsArray,
    }

    return response;

  }

}

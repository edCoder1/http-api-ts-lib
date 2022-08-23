import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateEventDTO } from './dtos/CreateEvent.dto';
import { GetAllEventsDTO } from './dtos/getAllEvents.dto';
import { BaseResponse } from './interfaces/HttpResponses.interfce';
import { ZapierEvent } from './interfaces/ZapierEvent.interface';
import { DriverService } from './services/driver.service';



export type GetEventsFields = 'status' | 'id' | 'event_type'

@Controller('events')
export class AppController {
  constructor(
    @Inject('EVENTS_DRIVER')
    private readonly driverService: DriverService,
  ) {}

  @Get('all')
  // pipes are used for schema validation.. look at the swagger doc 
  @UsePipes(new ValidationPipe())
  async getAllEvents(@Query('count') count: number, @Query('orderBy') orderBy: GetEventsFields): Promise<BaseResponse> {

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

  @Get(':id')
  @UsePipes(new ValidationPipe())
  async getEvent(@Param('id') id: number): Promise<BaseResponse> {


    let zapierEvent: ZapierEvent;

    try {
      
      zapierEvent = await this.driverService.getEvent(id);
    } catch (error) {
      console.log({error});
      
      if (error.response?.status === 404) {
        zapierEvent = {} as ZapierEvent;
      }
      
    }

    // todo: implement response handler/utility
    return {
      code: 200,
      message: 'success',
      data: [zapierEvent]
    }
  }

  @Post()
  // pipes are used for schema validation.. look at the swagger doc and try out this route with empty body to get validation errors
  @UsePipes(new ValidationPipe())
  async createEvent(@Body() event: CreateEventDTO): Promise<BaseResponse> {
    let newEvent: ZapierEvent;

    try {
      newEvent = await this.driverService.createEvent(event);
    } catch (error) {
      throw new Error(error)
    }

    return {
      code: 200,
      message: 'success',
      data: [newEvent]
    }
  }
}

import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { catchError, firstValueFrom, map, Observable, of, tap } from "rxjs";
import { GetEventsFields } from "src/app.controller";
import { GetEventsResponse } from "src/interfaces/GetEventsResponse.interface";
import { ZapierEvent } from "src/interfaces/ZapierEvent.interface";


// I decided to create the interfaces because creating one file per interface was
// too much time consuming
interface I {

}


// const, enums here too
enum Endpoints {
  GET_ALL_EVENTS = 'events',
}


@Injectable()
export class DriverService {

  constructor(
    private readonly httpService: HttpService,
    private readonly serviceHost: string,
    private readonly baseUrl: string,
    private readonly apiID: string,
    ) {
    this.serviceHost = serviceHost;
    this.baseUrl = baseUrl;
    this.apiID = apiID;
  }

  
  
  public async getAllEvents(recordsCount: number, orderBy?: GetEventsFields): Promise<ZapierEvent[] | Error> {

    console.log({ recordsCount, orderBy });

    const zapierEvents$: Observable<ZapierEvent[] | Error> =  this.httpService.get<GetEventsResponse>(`${this.serviceHost}/${this.baseUrl}/${Endpoints.GET_ALL_EVENTS}`,
      {
        params: {
            per_page: recordsCount,
            order_by: orderBy
          },
          auth: {
            username: this.apiID,
            // pass is ignored per documentation
            password: '',
          }
      }
    )
    .pipe(
      map((response) => response?.data?.objects),
      tap(
        // here: proper logging solution would be used,
        // like NewRelic or something
        (response) => console.log({ response }),
        // (err) => console.log({ err }),
        () => console.log('complete')
      ),
      catchError(
        // a proper error handler woulg go here.. with specific handling
        // for every expected and not expected error codes, even a redirection
        // or renderization of common error page
        (error) => {
          console.log({ error });
          console.log(error?.response?.status);
          
          
          // if (error.) {
            // 503
          // }

          throw new Error(error);
        }
      )
    );

      return await firstValueFrom(zapierEvents$)
  }
}
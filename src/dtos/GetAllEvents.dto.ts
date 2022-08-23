import { isDefined, IsIn, isIn, IsNumber, Max } from "class-validator";
import { GetEventsFields } from "src/app.controller";


export class GetAllEventsDTO {
  @IsNumber()
  @Max(300)
  count: string;
  @IsIn(['status', 'event_type', 'id'])
  orderBy: GetEventsFields;
}
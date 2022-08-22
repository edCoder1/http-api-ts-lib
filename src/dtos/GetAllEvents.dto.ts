import { isDefined, IsIn, isIn, IsNumber } from "class-validator";
import { GetEventsFields } from "src/app.controller";


export class GetAllEventsDTO {
  @IsNumber()
  count: string;
  @IsIn(['status', 'event_type', 'id'])
  orderBy: GetEventsFields;
}
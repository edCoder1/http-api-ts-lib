import { IsDefined, IsIn } from "class-validator";

export class CreateEventDTO {
  
  @IsIn(['create', 'update', 'delete'])
  event_type: string;
  
  @IsIn(['success', 'failure'])
  status: string;

  @IsDefined()
  payload: object;

}
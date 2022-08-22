import { ZapierEvent } from "./ZapierEvent.interface";

export interface BaseResponse {
  code: number;
  message: 'success' | 'false';
  data: ZapierEvent[] | string
}


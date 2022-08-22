import { ZapierEvent } from "./ZapierEvent.interface";

export interface GetEventsResponse {
  objects: ZapierEvent[];
  per_page: number;
  num_pages: number;
  page: number;
}
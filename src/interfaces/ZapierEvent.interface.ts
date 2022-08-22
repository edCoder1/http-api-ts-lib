
export interface ZapierEvent {
  id: number;
  status: string;
  event_type: string;
  payload: {[key:string]: any}
}

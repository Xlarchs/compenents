
export class Event {
  flightDate: string;
  title: any;


  constructor(obj: any = null) {
    if (obj != null) {
      Object.assign(this, obj);
    }
  }


}

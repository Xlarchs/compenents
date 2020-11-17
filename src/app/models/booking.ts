import { Coupon } from './Coupon';

export class Booking {
  id: number;
  flightDate: string;
  createDate: any
  passengerCount: any;
  coupon: Coupon;
  height: any;
  weight: any;
  price: any;
  status: any;

  constructor(obj: any = null) {
    if (obj != null) {
      Object.assign(this, obj);
    }
  }

}

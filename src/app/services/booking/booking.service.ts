import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient, private router: Router) { }

  path = "http://localhost:8090/api/booking";

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.path + "/getAll");
  }


}

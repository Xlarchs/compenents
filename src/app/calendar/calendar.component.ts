import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import bootstrapPlugin from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { Booking } from '../models/booking';
import { BookingService } from '../services/booking/booking.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [BookingService]

})

export class CalendarComponent implements OnInit {

  constructor(private bookingService: BookingService) { }

  bookings: Booking[];
  booking = new Booking();
  ngOnInit(): void {
    this.bookingService.getBookings().subscribe(data => {
      this.bookings = data;

      this.booking.flightDate = this.bookings[0].flightDate.substr(0, 10);
      console.log(this.booking.flightDate)
    });

  }


  calendarOptions: CalendarOptions = {
    showNonCurrentDates: false,
    selectable: true,
    themeSystem: 'darkly',
    plugins: [bootstrapPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    dateClick: this.handleDateClick.bind(this), // bind is important!
    eventSources: [

      // your event source
      {
        url: 'http://localhost:8090/api/flight/getEvents', // use the `url` property
        color: 'transparent',    // an option!
        textColor: 'black'  // an option!
      }
    ],

    selectMirror: true,
    bootstrapFontAwesome: {
      close: 'fa-times',
      prev: 'fa-chevron-left',
      next: 'fa-chevron-right',
      prevYear: 'fa-angle-double-left',
      nextYear: 'fa-angle-double-right'
    }
  };
  handleWindowResize: true;


  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

}

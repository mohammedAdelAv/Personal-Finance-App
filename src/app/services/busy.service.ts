import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})

export class BusyService {

  busyRequest = 0;

  constructor(private NgxSpinnerService: NgxSpinnerService) { }

  busy() {
    this.busyRequest++;
    this.NgxSpinnerService.show();
  }

  hide() {
    this.busyRequest--;

    this.NgxSpinnerService.hide();

  }

}

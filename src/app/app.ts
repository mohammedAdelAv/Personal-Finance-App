import { Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastContainerDirective, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

   @ViewChild(ToastContainerDirective, { static: true })
  toastContainer!: ToastContainerDirective;

  constructor(private toastr: ToastrService) { }
  ngOnInit() {
    this.toastr.overlayContainer = this.toastContainer;
  }

  protected readonly title = signal('firstng');
}

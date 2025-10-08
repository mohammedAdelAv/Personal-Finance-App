import { Component } from '@angular/core';
import { Header } from '../shared/header/header';
import { RouterOutlet } from '@angular/router';
import { MobileSidebar } from '../shared/mobile-sidebar/mobile-sidebar';


@Component({
  selector: 'app-layouts',
  imports: [ RouterOutlet],
  templateUrl: './layouts.html',
  styleUrls: ['./layouts.css'],
})

export class Layouts {

}




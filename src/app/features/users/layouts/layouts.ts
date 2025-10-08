import { Component, OnInit, HostListener } from '@angular/core';
import { Header } from '../shared/header/header';
import { RouterOutlet } from '@angular/router';
import { MobileSidebar } from '../shared/mobile-sidebar/mobile-sidebar';


@Component({
  selector: 'app-layouts',
  imports: [Header, RouterOutlet, MobileSidebar],
  templateUrl: './layouts.html',
  styleUrls: ['./layouts.css'],
})

export class Layouts implements OnInit {
  isMobileView = false;

  ngOnInit() {
    this.checkScreenSize();
  }

  // بنسمع لتغير حجم الشاشة
  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobileView = window.innerWidth <= 900;
  }

}




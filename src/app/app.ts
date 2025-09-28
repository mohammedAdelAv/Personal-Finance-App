import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Header } from './features/users/shared/header/header';
import { Footer } from './features/users/shared/footer/footer';



@Component({
  selector: 'app-root',
  imports: [Header, Footer, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('firstng');
}

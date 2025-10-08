import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})

export class Header {

  isMenuMinimized = false;

  // Minimize Sidebar
  toggleMenu() {
    this.isMenuMinimized = !this.isMenuMinimized;
    document.body.classList.toggle('collapsed', this.isMenuMinimized);
  }

}

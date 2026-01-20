import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})

export class Header {

  constructor(private router: Router, private toaster: ToastrService) { }
  isMenuMinimized = false;

  // Minimize Sidebar
  toggleMenu() {
    this.isMenuMinimized = !this.isMenuMinimized;
    document.body.classList.toggle('collapsed', this.isMenuMinimized);
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('auth');
    this.toaster.info('Logged out successfully', 'Info');
  }
}

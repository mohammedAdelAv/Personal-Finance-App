import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mobile-sidebar',
  imports: [RouterLink],
  templateUrl: './mobile-sidebar.html',
  styleUrl: './mobile-sidebar.css'
})
export class MobileSidebar {
constructor(private router: Router, private toaster: ToastrService) { }

  logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('auth');
    this.toaster.info('Logged out successfully', 'Info');
  }
}

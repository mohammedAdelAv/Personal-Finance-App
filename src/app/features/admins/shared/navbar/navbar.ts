import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  isAuth!: boolean;

  constructor( private router: Router, private toaster: ToastrService){
    if(localStorage.getItem('admin')){
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  }

  logout () {
    localStorage.removeItem('admin');
    this.router.navigateByUrl('admins/login');
    this.toaster.info('Logged out successfully', 'Info');
  }
}

import { routes } from './../../../../../app.routes';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  constructor(
    private serv: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  //
  protected AdminUsername!: string;
  protected AdminPassword!: string;
  protected IsAdmin!: boolean;

  //
  showPassword: boolean = false;

  ngOnInit(): void {

  }


  login() {
    this.serv.get().subscribe((data: any) => {
      let admin = data.find((userData: any) => {
        return (userData.userName === this.AdminUsername && userData.admin == true &&
          userData.passWord == this.AdminPassword);
      });
      if (admin) {
        this.toastr.success('Login Successful', 'Welcome');
        this.router.navigateByUrl("admins/home");
        localStorage.setItem('admin', admin);
      } else {
        this.toastr.error('Invalid Credentials', 'Login Failed');
      }
    });
  }

}

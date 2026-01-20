import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './log-in.html',
  styleUrls: ['./log-in.css']
})
export class LogIn implements OnInit {

  constructor(
    private serv: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  //
  protected userUsername!: string;
  protected userPassword!: string;

  //
  showPassword: boolean = false;

  ngOnInit(): void {

  }


  login() {
    this.serv.get().subscribe((data: any) => {
      let user = data.find((userData: any) => {
        return (userData.userName === this.userUsername &&
          userData.passWord == this.userPassword);
      });
      if (user) {
        this.toastr.success('Login Successful', 'Welcome');
        this.router.navigateByUrl("users");
        localStorage.setItem('user', user);
      } else {
        this.toastr.error('Invalid Credentials', 'Login Failed');
      }
    });
  }

}










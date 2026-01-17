import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './log-in.html',
  styleUrls: ['./log-in.css']
})
export class LogIn implements OnInit {

    constructor(
      private fb: FormBuilder,
      private serv: UserService) { }

    //
    protected AdminUsername!: string;
    protected AdminPassword!: string;
    protected IsAdmin!: boolean;

    //
    showPassword: boolean = false;

    // 1
    loginForm!: FormGroup;

    // 2
    createForm() {
      this.loginForm = this.fb.group({
        userName: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(20), Validators.pattern('^[a-zA-Z\\s]+$')]],
        passWord: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]]
      });
    }

    ngOnInit(): void {
      // 3
      this.createForm();
    }

    // 4
    get controls() {
      return this.loginForm.controls;
    }

    onSubmit() {
      if (this.loginForm.valid) {
        console.log(this.loginForm.value);
      }
    }

    login() {
      this.serv.get().subscribe((data: any) => {
        let admin = data.find((userData: any) => {
          return (userData.userName === this.AdminUsername &&
            userData.passWord === this.AdminPassword);
        });
        if (admin) {

        }
      });
    }

}










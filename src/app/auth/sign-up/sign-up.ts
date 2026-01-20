import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp implements OnInit {

  constructor(
    private fb: FormBuilder,
    private serv: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  //
  protected AdminUsername!: string;
  protected AdminPassword!: string;

  //
  showPassword: boolean = false;

  // 1
  signUpForm!: FormGroup;

  // 2
  createForm() {
    this.signUpForm = this.fb.group({
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
    return this.signUpForm.controls;
  }

  submit(signUpForm: any) {
    this.serv.post(signUpForm.value).subscribe((data: any) => {
      this.router.navigateByUrl('auth');
      this.toastr.success('Sign Up Successful', 'Welcome');
    });
  }

}

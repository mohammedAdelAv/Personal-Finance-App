import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../../../../services/users.service';


@Component({
  selector: 'app-users-create',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './users-create.html',
  styleUrl: './users-create.css'
})
export class UsersCreate implements OnInit {

  //
  UserForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serv: UsersService,
    private router: Router
  ) { this.serv.auth(); }

  ngOnInit(): void {
    this.createForm();

  }

  createForm() {
    this.UserForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(20), Validators.pattern('^[a-zA-Z\\s]+$')]],
      passWord: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]],
      admin: [false]
    });
  }

  get controls() {
    return this.UserForm.controls;
  }

  submit(UserForm: any) {
    this.serv.post(UserForm.value).subscribe((data: any) => {
      this.router.navigateByUrl('admins/ul', {
        state: { showToast: true }
      });
    });
  }

}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../../../services/users.service';
import { Users } from '../../../../../core/models/users';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';



@Component({
  selector: 'app-users-update',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './users-update.html',
  styleUrl: './users-update.css'
})
export class UsersUpdate {

  //
  showPassword: boolean = false;

   //
  UserForm!: FormGroup;

  //
  id: any;
  userById!: Users;
  constructor(private activeRoute: ActivatedRoute, private serv: UsersService, private fb: FormBuilder, private router: Router) {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.serv.getById(this.id).subscribe((data: any) => {
      this.userById = data;
      // assign values to form controls
      this.UserForm.patchValue(data);
    });
  }


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

  // Get form controls
  get controls() {
    return this.UserForm.controls;
  }

  submit(UserForm: any) {
    this.serv.put(UserForm.value, this.id).subscribe((data: any) => {
      this.router.navigateByUrl('admins/ul', {
        state: { showToast: false }
      });
    });
  }



}

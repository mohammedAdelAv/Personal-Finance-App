import { MatTableModule } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { UsersService } from '../../../../../services/users.service';
import { Router, RouterLink } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-list',
  imports: [MatTableModule, CommonModule, RouterLink],
  templateUrl: './users-list.html',
  styleUrls: ['./users-list.css'],
  standalone: true
})


export class UsersList implements OnInit {

  // Toggle Menu ellipsis
  openMenuId: string | null = null;
  toggleMenu(au: any) {
    this.openMenuId = this.openMenuId === au.id ? null : au.id;
  }

  // delete user
  deleteUser(id: any) {
    if (confirm('Are you sure to delete this user?')) {
      this.serv.delete(id).subscribe((res) => {
        // this.showData();
        this.toastr.success('User deleted successfully', 'Done');
      });
    }
  }

  ngOnInit(): void {
    const state = history.state as any;
    if (state?.showToast) {
      this.toastr.success('User created successfully', 'Done');
    }
  }

  // get data from json to allUsers arr
  allUsers!: any[];
  constructor(private serv: UsersService, private toastr: ToastrService, private router: Router) {
    this.showData();
  }

  // show users data
  showData() {
    this.serv.get().subscribe((data: any) => {
      this.allUsers = data;
    });
  }

}

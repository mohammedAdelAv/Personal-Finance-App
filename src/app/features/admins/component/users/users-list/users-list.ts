import { MatTableModule } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { UsersService } from '../../../../../services/users.service';
import { RouterLink } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-list',
  imports: [MatTableModule, CommonModule, RouterLink],
  templateUrl: './users-list.html',
  styleUrls: ['./users-list.css'],
  standalone: true
})


export class UsersList implements OnInit {

  ngOnInit(): void {
    // this.toastr.success('Saved successfully', 'Done');
  }

  // get data from json to allUsers arr
  allUsers!: any[];
  constructor(private serv: UsersService, private toastr: ToastrService,
  ) {
    this.serv.get().subscribe((data: any) => {
      this.allUsers = data;
    });
  }


}

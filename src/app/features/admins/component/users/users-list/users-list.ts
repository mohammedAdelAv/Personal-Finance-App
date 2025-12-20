import { MatTableModule } from '@angular/material/table';
import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { UsersService } from '../../../../../services/users.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-users-list',
  imports: [MatTableModule, CommonModule, RouterLink],
  templateUrl: './users-list.html',
  styleUrls: ['./users-list.css'],
  standalone: true
})
export class UsersList {

  // get data from json to allUsers arr
  allUsers!: any[];
  constructor(private serv: UsersService) {
    this.serv.get().subscribe((data: any) => {
      this.allUsers = data;
    });
  }


}

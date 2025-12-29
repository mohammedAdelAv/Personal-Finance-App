import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../../../services/users.service';
import { Users } from '../../../../../core/models/users';

@Component({
  selector: 'app-users-update',
  imports: [],
  templateUrl: './users-update.html',
  styleUrl: './users-update.css'
})
export class UsersUpdate {

  id: any;
  userById!: Users;
  constructor(private activeRoute: ActivatedRoute, private serv: UsersService) {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.serv.getById(this.id).subscribe((data: any) => {
      this.userById = data;
    });
  }

}

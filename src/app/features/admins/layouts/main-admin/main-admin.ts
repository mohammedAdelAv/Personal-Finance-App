import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-main-admin',
  imports: [RouterOutlet, Navbar],
  templateUrl: './main-admin.html',
  styleUrl: './main-admin.css'
})
export class MainAdmin {

}

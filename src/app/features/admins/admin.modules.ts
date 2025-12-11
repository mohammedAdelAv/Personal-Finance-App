import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// layout
import { MainAdmin } from "./layouts/main-admin/main-admin";
// all component
import { UsersCreate } from "./component/users/users-create/users-create";
import { UsersList } from "./component/users/users-list/users-list";
import { UsersUpdate } from "./component/users/users-update/users-update";
import { Home } from "./home/home";


let routes: Routes = [

  {
    path: "",
    component: MainAdmin,
    children: [
      { path: "home", component: Home },
      { path: "uc", component: UsersCreate },
      { path: "ul", component: UsersList },
      { path: "uu", component: UsersUpdate },

      { path: "", pathMatch: "full", redirectTo: "home" },
    ],
  },

];

// link routes for import & export
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminModule { }

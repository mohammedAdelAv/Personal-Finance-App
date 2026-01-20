import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";

import { LogIn } from "./log-in/log-in";
import { SignUp } from "./sign-up/sign-up";


const routes: Routes = [

  { path: "login", component: LogIn },
  { path: "Signup", component: SignUp },

  { path: "", pathMatch: "full", redirectTo: "login" },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class AuthModules {

}

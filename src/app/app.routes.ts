import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.modules').then((then) => then.userModules),
  },
  //
  {
    path: 'admins',
    loadChildren: () => import('./features/admins/admin.modules').then((then) => then.AdminModule),
  },
  //
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((then) => then.AuthModules),
  },

  { path: "", pathMatch: "full", redirectTo: "auth" },


];

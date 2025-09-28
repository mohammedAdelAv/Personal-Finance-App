import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.modules').then((then) => then.userModules),
  },
];

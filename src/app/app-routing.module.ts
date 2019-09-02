import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListPage } from './pages/user/list/user-list.page';
import { UserPage } from './pages/user/user.page';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { RegisterPage } from './pages/register/register.page';

const routes: Routes = [
  { path: '', component: RegisterPage },
  { path: 'userList', component: UserListPage },
  { path: 'user', component: UserPage },
  { path: 'user/:id', component: UserPage },
  { path: '**', component: NotFoundPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

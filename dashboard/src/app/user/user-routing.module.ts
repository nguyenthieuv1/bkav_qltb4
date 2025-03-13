import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import {UserHomeComponent} from './user-home/user-home.component';
import {UserDeviceListComponent} from './user-device-list/user-device-list.component';
import {ChangePasswordComponent} from './change-password/change-password.component';

const routes: Routes = [
  { path: 'home', component: UserComponent, children: [
      { path: 'my-devices', component: UserDeviceListComponent },
      { path: 'change-password', component: ChangePasswordComponent },
    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

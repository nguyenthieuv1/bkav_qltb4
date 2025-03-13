import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';
import {DeviceAssignComponent} from './device/device-assign/device-assign.component';
import {DeviceListComponent} from './device/device-list/device-list.component';
import {DeviceFormComponent} from './device/device-form/device-form.component';
import {UserFormComponent} from './user/user-form/user-form.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {DeviceListAllComponent} from './device/device-list-all/device-list-all.component';
import {UserListAssignComponent} from './user/user-list-assign/user-list-assign.component';
import {ConfirmReturnComponent} from './device/confirm-return/confirm-return.component';
import {DeviceListSearchComponent} from './device/device-list-search/device-list-search.component';


const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, children: [
      // { path: 'home', component: HomeComponent },
      {path: 'user/all', component: UserListComponent},
      {path: 'user/add', component: UserFormComponent},
      {path: 'user/edit/:id', component: UserFormComponent},
      // {path: 'device/search', component: DeviceListComponent},
      {path: 'device/add', component: DeviceFormComponent},
      {path: 'device/edit/:id', component: DeviceFormComponent},
      {path: 'device/assign/:id', component: UserListAssignComponent},
      {path: 'device/all', component: DeviceListSearchComponent},
      {path: 'device/confirm-return', component: ConfirmReturnComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}

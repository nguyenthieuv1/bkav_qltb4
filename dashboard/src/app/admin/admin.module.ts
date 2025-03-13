import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';

import {DeviceModule} from './device/device.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserListAssignComponent } from './user/user-list-assign/user-list-assign.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [DashboardComponent, SidebarComponent, NavbarComponent, HomeComponent, UsersComponent, UserFormComponent, UserListComponent, UserListAssignComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        DeviceModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        ReactiveFormsModule,
      NgxPaginationModule,
      MatDialogModule
      // ReactiveFormsModule,
        // MatFormFieldModule,
        // MatInputModule,
        // MatSelectModule,
        // MatOptionModule,
    ]
})
export class AdminModule { }

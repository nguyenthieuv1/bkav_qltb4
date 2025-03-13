import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceRoutingModule } from './device-routing.module';
import { DeviceComponent } from './device.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceFormComponent } from './device-form/device-form.component';
import { DeviceAssignComponent } from './device-assign/device-assign.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import { DeviceListAllComponent } from './device-list-all/device-list-all.component';
import { ConfirmReturnComponent } from './confirm-return/confirm-return.component';
import { DeviceListSearchComponent } from './device-list-search/device-list-search.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AssignUserDialogComponent } from './assign-user-dialog/assign-user-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [DeviceComponent, DeviceListComponent, DeviceFormComponent, DeviceAssignComponent, DeviceListAllComponent, ConfirmReturnComponent, DeviceListSearchComponent, AssignUserDialogComponent],
  imports: [
    CommonModule,
    DeviceRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    NgxPaginationModule,
    MatDialogModule
    // Cần import để dùng [(ngModel)]
  ]
})
export class DeviceModule { }

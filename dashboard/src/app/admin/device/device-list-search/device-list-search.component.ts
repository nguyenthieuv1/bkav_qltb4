import {Component, OnInit} from '@angular/core';
import {Device} from '../../../models/device';
import {DeviceService} from '../../../services/device.service';
import {Category} from '../../../models/category';
import {HttpErrorResponse} from '@angular/common/http';
import {CategoryService} from '../../../services/category.service';
import {MatDialog} from '@angular/material/dialog';
import {AssignUserDialogComponent} from '../assign-user-dialog/assign-user-dialog.component';
import {Account} from '../../../models/account';
import {ActivatedRoute, Router} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import {ReloadServiceService} from '../../../services/reload-service.service';

@Component({
  selector: 'app-device-list-search',
  templateUrl: './device-list-search.component.html',
  styleUrls: ['./device-list-search.component.css']
})
export class DeviceListSearchComponent implements OnInit {

  name?: string;
  id?: string;
  accountAssignName?: string;
  type?: string;
  description?: string;
  devices?: Device[];
  page = 0;
  totalPages: number;
  categorys?: Category[];
  idAccount?: number;

  constructor(
    private deviceService: DeviceService,
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private reloadService: ReloadServiceService,
  ) {
  }

  ngOnInit(): void {
    this.loadDevices();
    this.reloadService.reload$.subscribe(() => {
      this.loadDevices(); // Khi nhận được tín hiệu reload thì gọi lại API
    });
  }

  openAssignModal(device: Device) {
    const dialogRef = this.dialog.open(AssignUserDialogComponent, {
      width: '600px',
      data: {device}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.assignDeviceToUser(device, result);
      }
    });
  }

  assignDeviceToUser(device: Device, account: Account) {
    const confirmDelete = window.confirm(`Bạn có chắc chắn muốn gán thiết bị "${device.name}" có id là "${device.id}" cho "${account.username}" không?`);
    if (confirmDelete) {
      this.deviceService.assignDeviceToAccount(device.id, account.id).subscribe(
        (response) => {
          alert('Thành công!');
          window.location.reload();
        },
        (err: Error) => {
          alert('Lỗi!!!');
        }
      );
    }
  }

  changePage(newPage: number) {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.page = newPage;
      this.loadDevices();
      console.log('Current Page:', this.page);
      console.log('Total Pages:', this.totalPages);

    }
  }

  // page, name: string, id: string, description: string, type: string
  loadDevices() {
    this.deviceService.getAllDevice(this.page, this.name, this.id, this.description, this.type).subscribe(
      (response: any) => {
        this.devices = response.content;
        this.totalPages = response.totalPages;
        console.log('Devices:', this.devices);
        this.cdRef.detectChanges(); // Cập nhật UI
      },
      (err: Error) => {
        console.log(err);
      }
    );

    this.loadCategory();
  }

  loadCategory() {
    this.categoryService.getAll().subscribe(
      (response: Category[]) => {
        this.categorys = response;
        // console.log('response: ', response);
      },
      (err: HttpErrorResponse) => {
        console.log('có lỗi: ', err);
      }
    );
  }

  searchDevices() {
    this.loadDevices();
  }


  deleteDevice(device: Device) {
    const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa thiết bị "${device.name}" không?`);
    if (confirmDelete) {
      this.deviceService.deleteDevice(device.id).subscribe(
        (response: Device) => {
          alert('Đã xóa thành công!');
          this.loadDevices();
        },
        (error) => {
          console.error('Lỗi khi xóa thiết bị:', error);
          alert('Xóa thất bại. Vui lòng thử lại!');
        }
      );
    }
  }


}

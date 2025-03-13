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
  ) {
  }

  ngOnInit(): void {
    this.loadDevices();
  }

  openAssignModal(device: any) {
    const dialogRef = this.dialog.open(AssignUserDialogComponent, {
      width: '600px',
      data: {device}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.assignDeviceToUser(device.id, result);
      }
    });
  }

  assignDeviceToUser(idDevice: number, account: Account) {
    const confirmDelete = window.confirm(`Bạn có chắc chắn muốn gán thiết bị có id là ${idDevice} cho "${account.username}" không?`);
    if (confirmDelete){
      this.deviceService.assignDeviceToAccount(idDevice, account.id).subscribe(
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
    }
  }

  // page, name: string, id: string, description: string, type: string
  loadDevices() {
    this.deviceService.getAllDevice(this.page, this.name, this.id, this.description, this.type).subscribe(
      (response: any) => {
        this.devices = response.content;
        this.totalPages = response.totalPages;
        console.log(response);
      },
      (err: Error) => {
        console.log(err);
      }
    );
    this.categoryService.getAll().subscribe(
      (response: Category[]) => {
        this.categorys = response;
        console.log('response: ', response);
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

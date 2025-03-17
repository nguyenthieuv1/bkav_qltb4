import {Component, OnInit} from '@angular/core';
import {Device} from '../../models/device';
import {UserService} from '../../services/user.service';
import {ReloadServiceService} from '../../services/reload-service.service';

@Component({
  selector: 'app-user-device-list',
  templateUrl: './user-device-list.component.html',
  styleUrls: ['./user-device-list.component.css']
})
export class UserDeviceListComponent implements OnInit {

  devices?: Device[];

  constructor(
    private userService: UserService,
    private reloadService: ReloadServiceService,
              ) {
  }

  ngOnInit(): void {
    this.loadDevices();
    this.reloadService.reload$.subscribe(() => {
      this.loadDevices(); // Khi nhận được tín hiệu reload thì gọi lại API
    });
  }

  loadDevices(): void {
    this.userService.getDevicesOwn().subscribe(
      (devices: Device[]) => {
        this.devices = devices;
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  returnDevice(id: number) {
    const confirm = window.confirm(`Bạn có chắc chắn muốn trả device id: ${id} không?`);
    if (confirm){
      this.userService.returnDevice(id).subscribe(
        (device: Device) => {
          alert('Thành công');
          this.loadDevices();
          window.location.reload();
        },
        (err: Error) => {
          alert('có lỗi!');
          console.log(err);
          window.location.reload();
        }
      );
    }
  }

}

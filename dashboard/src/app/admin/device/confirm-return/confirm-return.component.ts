import {Component, OnInit} from '@angular/core';
import {DeviceService} from '../../../services/device.service';
import {Device} from '../../../models/device';
import {DeviceReturnConfirm} from '../../../models/device-return-confirm';

@Component({
  selector: 'app-confirm-return',
  templateUrl: './confirm-return.component.html',
  styleUrls: ['./confirm-return.component.css']
})
export class ConfirmReturnComponent implements OnInit {

  devices?: Device[];

  constructor(private deviceService: DeviceService) {
  }

  ngOnInit(): void {
    this.loadDevice();
  }

  loadDevice() {
    this.deviceService.getDeviceReturning().subscribe(
      (devices: Device[]) => {
        this.devices = devices;
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  confirmReturn(device: Device): void {
    // console.log(device);
    const confirm = window.confirm(`Bạn có chắc chắn muốn xác nhận trả device id: ${device.id} không?`);
    const devi: DeviceReturnConfirm = {deviceId: device.id};
    if(confirm){
      this.deviceService.confirmDeviceReturn(devi).subscribe(
        (response: DeviceReturnConfirm) => {
          alert('đã cập nhật');
          this.loadDevice();
        },
        (err: Error) => {
          console.log(err);
        }
      );
    }
  }


}

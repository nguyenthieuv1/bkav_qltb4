import {Component, OnInit} from '@angular/core';
import {Device} from '../../../models/device';
import {DeviceService} from '../../../services/device.service';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  devices: Device[] = [];
  searchTerm: string = '';

  constructor(private deviceService: DeviceService) {
  }

  ngOnInit(): void {
  }

  onSearch(): void {
    this.deviceService.searchDeviceByName(this.searchTerm).subscribe(
      (data) => {
        this.devices = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteDevice(device: Device) {
    this.deviceService.deleteDevice(device.id).subscribe(
      (response: Device) => {
        alert('Đã xóa thành công!');
        this.onSearch();
      },
      (error) => {
        console.log(error);
      }
    );
  }

}

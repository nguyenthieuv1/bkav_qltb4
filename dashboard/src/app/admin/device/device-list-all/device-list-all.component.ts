import {Component, OnInit} from '@angular/core';
import {Device} from '../../../models/device';
import {DeviceService} from '../../../services/device.service';

@Component({
  selector: 'app-device-list-all',
  templateUrl: './device-list-all.component.html',
  styleUrls: ['./device-list-all.component.css']
})
export class DeviceListAllComponent implements OnInit {

  constructor(private deviceService: DeviceService) {
  }

  name?: string;
  id?: number;
  accountAssignName?: string;
  type?: string;
  description?: string;

  devices?: Device[];
  devicesOrigin?: Device[];

  ngOnInit(): void {
    // this.deviceService.getAllDevice().subscribe(
    //   (response: Device[]) => {
    //     this.devices = response;
    //     this.devicesOrigin = response;
    //   },
    //   (err: Error) => {
    //     console.log(err);
    //   }
    // );
  }

  searchDevices() {
    this.devices = this.devicesOrigin.filter(device => {
      let check = true;

      if (this.name && !device.name?.toLowerCase().includes(this.name.toLowerCase())) {
        check = false;
      }

      if (this.id && device.id !== this.id) {
        check = false;
      }

      if (this.accountAssignName && !device.accountAssignName?.toLowerCase().includes(this.accountAssignName.toLowerCase())) {
        check = false;
      }

      if (this.type && !device.type?.toLowerCase().includes(this.type.toLowerCase())) {
        check = false;
      }

      if (this.description && !device.description?.toLowerCase().includes(this.description.toLowerCase())) {
        check = false;
      }

      return check;
    });
  }


}

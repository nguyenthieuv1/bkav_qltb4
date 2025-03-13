import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Device} from '../models/device';
import {DeviceBorrow} from '../models/device-borrow';
import {DeviceReturnConfirm} from '../models/device-return-confirm';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private adminApiUrl = 'http://localhost:8081/admin';

  token = localStorage.getItem('token'); // Lấy token từ localStorage
  public getLoginHeader() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}` // Thêm token vào header
    });
    return headers;
  }

  constructor(private http: HttpClient) {
  }

  addDevice(device: Device): Observable<Device> {
    console.log(device);
    const headers = this.getLoginHeader();
    return this.http.post<Device>(this.adminApiUrl + '/devices', device, {headers});
  }

  getDeviceById(id: number): Observable<Device> {
    const headers = this.getLoginHeader();
    return this.http.get<Device>(`${this.adminApiUrl}/devices/${id}`, {headers});
  }

  searchDeviceByName(search: string): Observable<Device[]> {
    const headers: HttpHeaders = this.getLoginHeader();
    return this.http.get<Device[]>(
      `${this.adminApiUrl}/device?name=${search}`,
      {headers}
    );
  }

  updateDevice(id: number, device: Device): Observable<Device> {
    const headers: HttpHeaders = this.getLoginHeader();
    return this.http.put<Device>(`${this.adminApiUrl}/devices/${id}`, device, {headers});
  }

  deleteDevice(id: number): Observable<Device> {
    const headers = this.getLoginHeader();
    return this.http.delete(this.adminApiUrl + '/devices/' + id, {headers});
  }

  getAllDevice(page: number, name = '', id = '', description = '', type = ''): Observable<any> {
    const headers = this.getLoginHeader();
    const params = new HttpParams()
      .set('name', name)
      .set('id', id)
      .set('description', description)
      .set('type', type)
    ;
    return this.http.get<any>(`${this.adminApiUrl}/devices/all/${page}`, {headers, params});
  }


  assignDeviceToAccount(deviceID: number, accountID: number): Observable<DeviceBorrow> {
    let deviceBorrow = {deviceId: deviceID, accountId: accountID};
    console.log('Device borrow:', deviceBorrow);
    const headers = this.getLoginHeader();
    return this.http.post<DeviceBorrow>(this.adminApiUrl + '/devices-borrow', deviceBorrow, {headers});
  }

  getDeviceReturning(): Observable<Device[]> {
    const headers = this.getLoginHeader();
    return this.http.get<Device[]>(`${this.adminApiUrl}/devices/return`, {headers});
  }

  confirmDeviceReturn(devi: DeviceReturnConfirm): Observable<DeviceReturnConfirm> {
    const headers = this.getLoginHeader();
    return this.http.put<DeviceReturnConfirm>(`${this.adminApiUrl}/confirm-device-return`, devi, {headers});
  }
}

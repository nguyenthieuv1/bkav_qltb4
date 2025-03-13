import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Device} from '../models/device';
import {Account} from '../models/account';
import {User} from '../models/user';
import {PasswordChange} from '../models/password-change';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private adminApiUrl = 'http://localhost:8081/admin/user';
  private userApiUrl = 'http://localhost:8081/user';
  private apiUrl = 'http://localhost:8081';

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

  getAllUser(page: number, username: string, fullName: string, phone: string, address: string, role: string): Observable<any> {
    const headers = this.getLoginHeader();
    const params = new HttpParams()
      .set('username', username)
      .set('fullName', fullName)
      .set('phone', phone)
      .set('address', address)
      .set('role', role);
    return this.http.get<any>(`${this.adminApiUrl}/all/${page}`, {headers, params});
  }

  getAllUserNoPagination() {
    const headers = this.getLoginHeader();
    return this.http.get<Account[]>(`${this.adminApiUrl}/all`, {headers});
  }

  deleteUser(id: number): Observable<Account> {
    const headers = this.getLoginHeader();
    return this.http.delete<Account>(`${this.adminApiUrl}/${id}`, {headers});
  }

  getUserById(id: number): Observable<Account> {
    const headers = this.getLoginHeader();
    return this.http.get<Account>(`${this.adminApiUrl}/${id}`, {headers});
  }

  updateUser(id: number, account: Account): Observable<Account> {
    console.log(account);
    const headers = this.getLoginHeader();
    return this.http.put<Account>(`${this.adminApiUrl}/${id}`, account, {headers});
  }

  addUser(account: Account): Observable<Account> {
    const headers = this.getLoginHeader();
    return this.http.post<Account>(`${this.adminApiUrl}`, account, {headers});
  }

  getDevicesOwn(): Observable<Device[]> {
    const headers = this.getLoginHeader();
    return this.http.get<Device[]>(`${this.userApiUrl}/devices`, {headers});
  }

  returnDevice(id: number): Observable<Device> {
    const headers = this.getLoginHeader();
    console.log('Request Headers:', headers);
    return this.http.put<Device>(`${this.userApiUrl}/return-device/${id}`, {}, {headers});
  }

  changePassword(passwordChange: PasswordChange): Observable<PasswordChange> {
    const headers = this.getLoginHeader();
    return this.http.post<PasswordChange>(`${this.apiUrl}/change-password`, passwordChange, {headers});
  }
}

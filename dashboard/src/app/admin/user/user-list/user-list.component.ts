import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {Account} from '../../../models/account';
import {UserService} from '../../../services/user.service';
import {Device} from '../../../models/device';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  accounts: Account[];
  searchFullname = '';
  searchId?: number;
  searchAddress = '';
  searchRole = '';
  searchUsername = '';
  page = 0;
  totalPages = 0;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.loadUser(this.page, this.searchUsername, this.searchFullname, this.searchAddress, this.searchRole);
  }

  loadUser(page, searchUsername, searchFullname, searchAddress, searchRole): void {
    this.userService.getAllUser(page, searchUsername,
      searchFullname, '', searchAddress, searchRole).subscribe(
      (response: any) => {
        this.accounts = response.content; // Lấy danh sách tài khoản
        this.totalPages = response.totalPages; // Lấy tổng số trang
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  changePage(newPage: number) {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.page = newPage;
      this.loadUser(this.page, this.searchUsername, this.searchFullname, this.searchAddress, this.searchRole);
    }
  }

  deleteAccount(account: Account) {
    const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa account "${account.username}" không?`);
    if (confirmDelete){
      this.userService.deleteUser(account.id).subscribe(
        (response: Device) => {
          alert('đã xóa thành công!!');
          this.loadUser(this.page, this.searchUsername, this.searchFullname, this.searchAddress, this.searchRole);
        },
        (error) => {
          alert('lỗi: user này đang mượn thiết bị');
        }
      );
    }
  }

  searchAccounts() {
    this.loadUser(this.page, this.searchUsername, this.searchFullname, this.searchAddress, this.searchRole);
  }


}

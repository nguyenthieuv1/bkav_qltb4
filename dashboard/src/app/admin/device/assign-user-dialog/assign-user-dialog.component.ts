import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Account} from '../../../models/account';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-assign-user-dialog',
  templateUrl: './assign-user-dialog.component.html',
  styleUrls: ['./assign-user-dialog.component.css']
})
export class AssignUserDialogComponent implements OnInit {
  searchUsername = '';
  accounts: Account[];
  page = 0;
  totalPages?: number;

  ngOnInit(): void {
    this.loadUser();
  }

  constructor(
    public dialogRef: MatDialogRef<AssignUserDialogComponent>,
    private userService: UserService
  ) {
  }

  changePage(newPage: number) {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.page = newPage;
      this.loadUser();
    }
  }

  loadUser(): void {
    this.userService.getAllUser(this.page, this.searchUsername,
      '', '', '', '').subscribe(
      (response: any) => {
        this.accounts = response.content; // Lấy danh sách tài khoản
        this.totalPages = response.totalPages; // Lấy tổng số trang
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  searchByUsername(): void {
    this.loadUser();
  }

  selectUser(user: any) {
    this.dialogRef.close(user); // Trả về user được chọn
  }

  close() {
    this.dialogRef.close(); // Đóng dialog mà không chọn ai
  }

}

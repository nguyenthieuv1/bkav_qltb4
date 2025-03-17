import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Device} from '../../../models/device';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {Account} from '../../../models/account';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  accountId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    // Khởi tạo Form
    this.userForm = this.fb.group({
        username: ['', [Validators.pattern(/^\S+$/), Validators.required]],
        password: ['', [Validators.required, Validators.minLength(3)]],
        fullName: ['', Validators.required],
        phone: [''],
        address: [''],
        role: ['', Validators.required],
      }
    );

    // Kiểm tra nếu có ID trong URL -> Chỉnh sửa thiết bị
    this.accountId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.accountId) {
      this.userService.getUserById(this.accountId).subscribe((account: Account) => {
        this.userForm.patchValue(account);
      });
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userData: Account = this.userForm.value;

      if (this.accountId) {
        // Gửi API cập nhật account
        this.userService.updateUser(this.accountId, userData).subscribe(() => {
          alert('account đã được cập nhật thành công!');
        });
      } else {
        // Gửi API thêm mới account
        this.userService.addUser(userData).subscribe(() => {
            alert('Account đã được thêm thành công!');
            this.router.navigate(['/dashboard/user/all']);
          },
          (error) => {
            alert('lỗi');
          }
        );
      }
    }
    console.log(this.userForm.value);
  }
}

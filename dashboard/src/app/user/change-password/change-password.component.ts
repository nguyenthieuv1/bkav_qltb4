import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {DeviceService} from '../../services/device.service';
import {UserService} from '../../services/user.service';
import {PasswordChange} from '../../models/password-change';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private auth: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
        oldPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(3)]],
        confirmPassword: ['', Validators.required]
      },
      {validator: this.matchPasswordValidator('newPassword', 'confirmPassword')} // Thêm validator
    );
  }

  onSubmit() {
    if (this.passwordForm.invalid) {
      alert('Passwords do not match');
      return;
    }
    // console.log('Mật khẩu hợp lệ!', this.passwordForm.value);
    this.userService.changePassword(this.passwordForm.value).subscribe(
      (res: PasswordChange) => {
        alert('success!');
        this.auth.logout();
      },
      (error) => {
        alert('mật khẩu cũ không đúng');
      }
    );

  }

  matchPasswordValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get(passwordKey)?.value;
      const confirmPassword = control.get(confirmPasswordKey)?.value;

      return password === confirmPassword ? null : {passwordMismatch: true};
    };
  }
}

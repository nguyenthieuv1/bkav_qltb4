import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.pattern(/^\S+$/), Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.authService.saveTokenAndRole(res.token, res.role);
          this.authService.redirectUser(res.role);
          console.log(res);
        },
        error: () => {
          this.errorMessage = 'Wrong account or password!';
        }
      });
    }
  }

  // Trả về lỗi validation của một trường
  getErrorMessage(field: string) {
    const control = this.loginForm.get(field);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('pattern')) {
      return 'No spaces allowed';
    }
    if (control?.hasError('minlength')) {
      return `Minimum ${control.errors?.['minlength'].requiredLength} characters`;
    }
    if (control?.hasError('maxlength')) {
      return `Maximun ${control.errors?.['maxlength'].requiredLength} characters`;
    }
    return '';
  }

}

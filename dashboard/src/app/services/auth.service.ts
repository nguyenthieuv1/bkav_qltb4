import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {UsernamePassword} from '../models/username-password';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: UsernamePassword): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, credentials);
  }

  redirectUser(role: string) {
    if (role === 'ROLE_ADMIN') {
      this.router.navigate(['/admin/dashboard/user/all']).then(success => {
        console.log('Navigation admin success:', success);
      }).catch(err => {
        console.error('Navigation error:', err);
      });
    } else {
      this.router.navigate(['/user/home/my-devices']).then(success => {
        console.log('Navigation success:', success);
      }).catch(err => {
        console.error('Navigation error:', err);
      });
    }
  }

  saveTokenAndRole(token: string,role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getRole() {
    return localStorage.getItem('role');
  }

}

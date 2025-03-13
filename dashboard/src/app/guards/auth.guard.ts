import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];  // Lấy role yêu cầu từ route
    const userRole = this.authService.getRole();  // Lấy role từ localStorage

    console.log('Expected Role:', expectedRole);
    console.log('User Role:', userRole);

    if (userRole && userRole === expectedRole) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']); // Chuyển hướng nếu không đủ quyền
      return false;
    }
  }
}

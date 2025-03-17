import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UserListComponent} from '../user/user-list/user-list.component';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ReloadServiceService} from '../../services/reload-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUrl = '';



  constructor(
    private authService: AuthService,
    private reloadService: ReloadServiceService,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

  reload(){
    // window.location.reload();
    this.reloadService.triggerReload(); // Gửi tín hiệu reload
  }


}

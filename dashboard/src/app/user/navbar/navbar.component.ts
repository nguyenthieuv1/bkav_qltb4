import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ReloadServiceService} from '../../services/reload-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

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
    this.reloadService.triggerReload(); // Gửi tín hiệu reload
  }

}

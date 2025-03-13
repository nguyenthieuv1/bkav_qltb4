import {Component, OnInit} from '@angular/core';
import {Account} from '../../../models/account';
import {UserService} from '../../../services/user.service';
import {Device} from '../../../models/device';
import {DeviceService} from '../../../services/device.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-list-assign',
  templateUrl: './user-list-assign.component.html',
  styleUrls: ['./user-list-assign.component.css']
})
export class UserListAssignComponent implements OnInit {

  accounts: Account[];
  accountsOrigin: Account[];
  searchFullname?: string;
  searchId?: number;
  searchAddress?: string;
  searchRole?: string;
  searchUsername?: string;

  constructor(
    private userService: UserService,
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    // this.userService.getAllUser().subscribe(
    //   (response: Account[]) => {
    //     this.accountsOrigin = response;
    //     this.accounts = response;
    //   },
    //   (err: Error) => {
    //     console.log(err);
    //   }
    // );
  }

  searchAccounts() {
    this.accounts = this.accountsOrigin;
    console.log(this.accountsOrigin);

    this.accounts = this.accounts.filter(account => {
      let check = true;

      if (this.searchFullname && !account.fullName.toLowerCase().includes(this.searchFullname.toLowerCase())) {
        check = false;
      }

      if (this.searchId && account.id !== this.searchId) {
        check = false;
      }

      if (this.searchAddress && !account.address.toLowerCase().includes(this.searchAddress.toLowerCase())) {
        check = false;
      }

      if (this.searchRole && !account.role.toLowerCase().includes(this.searchRole.toLowerCase())) {
        check = false;
      }

      if (this.searchUsername && !account.username.toLowerCase().includes(this.searchUsername.toLowerCase())) {
        check = false;
      }

      return check;
    });
  }

  assignDeviceToUser(account: Account) {
    const deviceId = Number(this.route.snapshot.paramMap.get('id'));
    this.deviceService.assignDeviceToAccount(deviceId, account.id).subscribe(
      (response) => {
        alert('Thành công!');
        this.router.navigate(['/dashboard/device/all']);
      },
      (err: Error) => {
        alert('Lỗi!!!');
      }
    );
    console.log(account);
  }


}

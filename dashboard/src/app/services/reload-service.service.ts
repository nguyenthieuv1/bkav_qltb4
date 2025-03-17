import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReloadServiceService {

  private reloadSubject = new Subject<void>();

  reload$ = this.reloadSubject.asObservable(); // Biến thành Observable để các component có thể subscribe
  constructor() { }

  triggerReload() {
    this.reloadSubject.next(); // Phát sự kiện reload
  }
}

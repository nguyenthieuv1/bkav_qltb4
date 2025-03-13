import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Device} from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8081/category';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Device[]> {
    return this.http.get<Device[]>(this.apiUrl + '/all');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserCreateDto } from './models/user-create-dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.userManagementUrl;; 
  constructor(private http: HttpClient) {}

  createUser(userData: UserCreateDto): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/user/create', userData);
  }
}

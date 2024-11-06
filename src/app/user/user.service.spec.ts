import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserCreateDto } from './models/user-create-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Aquí puedes definir la URL de tu API para crear un usuario
  private apiUrl = 'http://tuservidor.com/api/usuarios';

  constructor(private http: HttpClient) {}

  // Método para crear el usuario
  createUser(user: UserCreateDto): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}

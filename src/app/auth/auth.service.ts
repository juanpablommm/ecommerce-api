import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponseDto } from './models/login-response-dto';
import { LoginRequestDto } from './models/login-request-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/user-management';  // Cambia esta URL por la de tu API

  constructor(private http: HttpClient) {}

  // Método de login
  login(loginRequest: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.apiUrl}/auth/login`, loginRequest, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Método para obtener el refresh token desde la cookie
  getRefreshToken(): string | null {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith('refresh_token='))
      ?.split('=')[1] || null;
  }

  // Método para obtener el token de acceso desde el localStorage
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Método para renovar el access token usando el refresh token
  refreshToken(refreshToken: string): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.apiUrl}/user-management/auth/refresh`, { token: refreshToken });
  }

  // Método para almacenar los tokens
  storeTokens(response: LoginResponseDto): void {
    // Guardar el access token en el localStorage
    localStorage.setItem('access_token', response.accessToken);

    // Guardar el refresh token en la cookie
    document.cookie = `refresh_token=${response.token}; path=/; secure; HttpOnly; SameSite=Strict`;
  }

  // Método de logout
  logout(): void {
    localStorage.removeItem('access_token');
    document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

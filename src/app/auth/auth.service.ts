import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponseDto } from './models/login-response-dto';
import { LoginRequestDto } from './models/login-request-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/user-management';

  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.apiUrl}/auth/login`, loginRequest, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getRefreshToken(): string | null {
    // Verificación de si `document` está disponible (solo en entorno de navegador)
    if (typeof document !== 'undefined') {
      return document.cookie
        .split('; ')
        .find(row => row.startsWith('refresh_token='))
        ?.split('=')[1] || null;
    }
    return null;
  }

  getAccessToken(): string | null {
    // Verificación de `localStorage`
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  refreshToken(refreshToken: string): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.apiUrl}/auth/refresh`, { token: refreshToken });
  }

  storeTokens(response: LoginResponseDto): void {
    // Guardar en localStorage solo si está disponible
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('access_token', response.accessToken);
    }

    // Guardar cookie solo si `document` está disponible
    if (typeof document !== 'undefined') {
      document.cookie = `refresh_token=${response.token}; path=/; secure; HttpOnly; SameSite=Strict`;
    }
  }

  logout(): void {
    // Eliminar el token de localStorage y cookie solo en entorno de navegador
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('access_token');
    }

    if (typeof document !== 'undefined') {
      document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }
}

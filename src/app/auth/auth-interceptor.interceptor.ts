import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';  // Asegúrate de importar tu servicio de autenticación

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let accessToken = this.authService.getAccessToken();
    const refreshToken = this.authService.getRefreshToken();  // Obtener el refresh token

    if (accessToken) {
      // Si el token de acceso está presente, lo incluimos en la cabecera de la solicitud
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si la respuesta tiene un status 403 y el mensaje "Invalid Authentication", el token ha expirado
        if (error.status === 403 && error.error.message === "Invalid Authentication" && refreshToken) {
          alert("inavlido")
          // Hacer una solicitud para obtener un nuevo access token usando el refresh token
          return this.authService.refreshToken(refreshToken).pipe(
            switchMap((newTokens) => {
              // Almacenar los nuevos tokens
              this.authService.storeTokens(newTokens);

              // Clonar la solicitud original y agregar el nuevo access token
              const clonedRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newTokens.accessToken}`
                }
              });

              // Reintentar la solicitud original con el nuevo token
              return next.handle(clonedRequest);
            }),
            catchError((err) => {
              // Si algo falla en el refresh, hacer logout
              this.authService.logout();
              return throwError(err);
            })
          );
        }

        // Si no es un error 403 o el mensaje no es "Invalid Authentication", propagar el error
        return throwError(error);
      })
    );
  }
}

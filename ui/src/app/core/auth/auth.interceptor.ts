import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService); 
  const router = inject(Router); 

  const credentials = auth.getCredentials();
  const requete = credentials
    ? req.clone({ setHeaders: { Authorization: `Basic ${credentials}` } }) 
    : req;

  return next(requete).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        auth.deconnecter();
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};
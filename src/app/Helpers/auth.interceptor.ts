import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    // Clone the request to add the new header
    let clonedReq = req;
    if (accessToken) {
      clonedReq = req.clone({
        headers: req.headers.set('Authorization', `${accessToken}`)
      });
    }

    return next.handle(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Delete token and refresh the page
          localStorage.removeItem('accessToken');
          window.location.reload();
        }
        return throwError(error);
      })
    );
  }
}

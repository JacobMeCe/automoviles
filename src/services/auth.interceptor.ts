/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router:Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token: any = '';
    if(!localStorage.getItem('token')){
      token = localStorage.getItem('t');
     }else{

      token = localStorage.getItem('token');
    }

    let  clonedRequest = req;
    if(token){
         clonedRequest = req.clone({
            headers: new HttpHeaders({
          Authorization: 'App' + token,

        })
      });
    }
    //console.log(clonedRequest);
    return next.handle(clonedRequest).pipe(
      catchError(this.manejaError)
    );
  }
  manejaError(error: HttpErrorResponse) {
    if(error.status === 403){ //Al expirar token, error 500, cierra sesion
      localStorage.clear()
      location.reload()
    }
    return throwError(error);
  }



}

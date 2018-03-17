import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService,
    private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
        // console.log('Response interceptado');
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // redirect to the login route
          this.auth.startAuthentication();
          return;
        } if (err.status === 409) {
          return;
        }
        err.error.message = 'Ha ocurrido un error de en el servidor.';
        return;
      }
    });
  }
}

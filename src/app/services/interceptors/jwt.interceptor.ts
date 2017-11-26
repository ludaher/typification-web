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

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) { }

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
          // or show a modal
        } if (err.status !== 409) {
          return { error: err.error };
        }
        return { error: 'Ha ocurrido un error con el request.' };
      }
    });
  }
}

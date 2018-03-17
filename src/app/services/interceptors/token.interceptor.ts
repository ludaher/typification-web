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
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isLoggedIn()) {
      request = request.clone({
        setHeaders: {
          Authorization: this.auth.getAuthorizationHeaderValue()
        }
      });
    }
    request = request.clone({
      setHeaders: {
        'Content-Type': `application/json`
      }
    });
    return next.handle(request);
  }
}

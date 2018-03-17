import { Injectable, EventEmitter, Output } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../../environments/environment';

import { UserManager, UserManagerSettings, User, WebStorageStateStore } from 'oidc-client';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class AuthService {

  @Output() userLoggedin: EventEmitter<any> = new EventEmitter<any>();
  @Output() userLoggedout: EventEmitter<any> = new EventEmitter<any>();

  private manager = new UserManager(getClientSettings());
  private user: User = null;

  constructor(private router: Router, private location: Location) {
    this.manager.getUser().then(user => {
      this.user = user;
    });
  }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  getClaims(): any {
    return this.user.profile;
  }

  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  startAuthentication(): Promise<void> {
    const returnUrl = this.location.path(); // encodeURIComponent(window.location.href);
    localStorage.setItem('returnUrl', returnUrl);
    return this.manager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
      console.log(user);
      this.user = user;
      this.userLoggedin.emit(user);
      const returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl || returnUrl === '') {
        this.router.navigate(['/home']);

      } else {
        this.router.navigate([returnUrl]);
      }
    }).catch(error => {
        this.router.navigate(['/home']);
    });
  }

  logout() {
    this.manager.signoutRedirect();
    this.userLoggedout.emit(this.user);
  }

  currentUser(): any {
    return this.user;
  }
}

export function getClientSettings(): UserManagerSettings {
  const settings = environment.clientSettings as UserManagerSettings;
  settings.userStore = new WebStorageStateStore({ store: window.localStorage });
  return settings;
}

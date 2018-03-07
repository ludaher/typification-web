import { Injectable, EventEmitter, Output } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../../environments/environment';

import { UserManager, UserManagerSettings, User } from 'oidc-client';

@Injectable()
export class AuthService {

  @Output() userLoggedin: EventEmitter<any> = new EventEmitter<any>();
  @Output() userLoggedout: EventEmitter<any> = new EventEmitter<any>();

  private manager = new UserManager(getClientSettings());
  private user: User = null;

  constructor() {
    this.manager.getUser().then(user => {
      this.user = user;
    });
  }

  public gotoLogin() {
    // localStorage.setItem('imgncrd_rtrn_url', window.location.href);
    const returnUrl = encodeURIComponent(window.location.href);
    window.location.href = environment.loginUrl + '?returnUrl=' + returnUrl;
  }

  login(username, data) {
    // login successful if there's a jwt token in the response
    const token = data.token;
    if (token) {
      // store username and jwt token in a cookie to keep user logged
      this.saveUser(JSON.stringify({ username: username, token: token }));
      this.userLoggedin.emit(data);
    }
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.cleanUser();
    this.userLoggedout.emit();
    this.gotoLogin();
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
    return this.manager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
      this.user = user;
    });
  }





  public isAuthenticated(): boolean {
    return true;
    // // get the token
    // const token = this.getToken();
    // // return a boolean reflecting
    // // whether or not the token is expired
    // return tokenNotExpired(null, token);
  }

  currentUser(): any {
    if (localStorage.getItem(environment.cookie)) {
      return JSON.parse(localStorage.getItem(environment.cookie));
    }
    return {};
  }

  public getToken(): string {
    const user = this.currentUser();
    if (user) { return user.token; }
    return user;
  }

  public cleanUser() {
    localStorage.deleteItem(environment.cookie);
  }

  public saveUser(userAsString) {
    localStorage.setItem(environment.cookie, userAsString);
  }
}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: 'http://216.69.181.183/IdentityServer/',
    client_id: 'ro.client',
    redirect_uri: 'http://localhost:4201/auth-callback/',
    post_logout_redirect_uri: 'http://localhost:4201/',
    response_type: 'token',
    scope: 'api1',
    filterProtocolClaims: true,
    loadUserInfo: true
  };
}

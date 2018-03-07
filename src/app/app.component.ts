import { Component } from '@angular/core';
import { AuthService } from './services/authentication/auth.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  logged = false;
  constructor(private authService: AuthService) {
    // const user = this.authService.currentUser();
    // if (!user || !user.token) {
    //   this.authService.gotoLogin();
    //   return;
    // }
    // this.logged = true;
  }

  ngOnInit() {
    this.logged = this.authService.isAuthenticated();
  }
}

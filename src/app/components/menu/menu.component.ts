import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
// RECOMMENDED (doesn't work with system.js)
// import { CollapseModule } from 'ngx-bootstrap/collapse';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  username: string;
  constructor(private authService: AuthService) {
    authService.userLoggedin.subscribe(obj => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    const user = this.authService.currentUser();
    this.loadCurrentUser(user);
  }

  logout() {
    this.authService.logout();
  }
  loadCurrentUser(user: any): void {
    if (!user || user == null) { return; }
    this.username = user.profile.user_name;
  }
}

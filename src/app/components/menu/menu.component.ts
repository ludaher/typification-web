import { Component, OnInit } from '@angular/core';
// RECOMMENDED (doesn't work with system.js)
// import { CollapseModule } from 'ngx-bootstrap/collapse';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  username: string;
  constructor() { }

  ngOnInit() {
  }

  logout() {

  }
}

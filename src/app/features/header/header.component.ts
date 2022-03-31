import { Component, OnInit } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth: boolean = true;

  constructor(private jwtHelper: JwtHelperService, private router: Router) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token') ?? '';
    if (this.jwtHelper.isTokenExpired(token)) {
      this.isAuth = false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['home']);
  }
}

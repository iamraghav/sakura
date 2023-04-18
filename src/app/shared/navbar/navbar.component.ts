import { first } from 'rxjs/operators';
import { User } from './../../_models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../_services/authentication.service';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: Partial<User> = {};

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService
      .getCurrentUser()
      .pipe(first())
      .subscribe((user) => {
        console.log(user);
        this.user = user;
        this.user.av = `https://api.dicebear.com/6.x/adventurer/svg?seed=${user.email}`;
      });
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

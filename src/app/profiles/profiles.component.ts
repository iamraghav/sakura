import { first } from 'rxjs';
import { UserService } from '../_services';
import { ProfileService } from './../_services/profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent implements OnInit {
  profiles: any;

  constructor(
    private profileService: ProfileService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.showProfiles();
  }

  showProfiles() {
    this.profileService.getAllProfiles().subscribe((data) => {
      // console.log(data);
      this.profiles = data;
    });

    this.userService
      .getCurrentUser()
      .pipe(first())
      .subscribe((user) => {
        console.log(user);
        this.profiles = this.profiles.map((profile: any) => {
          const res = { ...profile };
          res.av = `https://api.dicebear.com/6.x/adventurer/svg?seed=${user.email}`;
          return res;
        });
      });
  }
}

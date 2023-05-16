import { ActivatedRoute } from '@angular/router';
import { ProfileService } from './../_services/profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: any;
  profileId: any;

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((res) => (this.profileId = res['id']));
  }

  ngOnInit() {
    this.showProfile();
  }

  showProfile() {
    this.profileService
      .getProfileById(this.profileId)
      .subscribe((data: any) => {
        console.log(data);
        this.profile = data;
        this.profile.av = `https://api.dicebear.com/6.x/initials/svg?seed=${data.user.name}`;
      });
  }
}

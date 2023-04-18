import { Router } from '@angular/router';
import { ProfileService } from './../_services/profile.service';
import { User } from '../_models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  loading = false;
  user: Partial<User> = {};
  imageUrl: string = '';
  profile: any;

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit() {
    this.showProfile();
  }

  showProfile() {
    this.profileService.getCurrentUserProfile().subscribe((data) => {
      console.log(data);
      this.profile = data;
    });
  }

  deleteExp(id: string) {
    this.profileService.deleteExp(id).subscribe((res) => {
      console.log(res);
      window.location.reload();
    });
  }

  deleteEdu(id: string) {
    this.profileService.deleteEdu(id).subscribe((res) => {
      console.log(res);
      window.location.reload();
    });
  }

  //Danger
  deleteMyAccount() {
    this.profileService.deleteProfile().subscribe((res) => {
      this.router.navigateByUrl('/login');
    });
  }
}

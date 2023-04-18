import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ProfileService } from './../../_services/profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  profile: any;
  profileForm: FormGroup;
  loading = false;
  submitted = false;
  error: any = {};

  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.profileForm = this.formBuilder.group({
      handle: ['', Validators.required],
      status: ['', Validators.required],
      company: ['', Validators.required],
      website: ['', Validators.required],
      location: ['', Validators.required],
      skills: ['', Validators.required],
      bio: [''],
    });
  }

  ngOnInit() {
    this.showProfile();
  }

  get f() {
    return this.profileForm.controls;
  }

  showProfile() {
    this.profileService.getCurrentUserProfile().subscribe((data) => {
      console.log(data);
      this.profile = data;
      const {
        handle,
        status,
        company,
        website,
        location,
        skills,
        bio,
        social,
      } = this.profile;
      this.profileForm.patchValue({
        handle,
        status,
        company,
        website,
        location,
        skills,
        bio,
        social,
      });
    });
  }

  onSubmit() {
    this.profile = this.profileForm.value;
    this.submitted = true;
    this.profile.skills = this.profile.skills.toString();
    console.log(this.profile);
    if (this.profileForm.invalid) {
      return;
    }
    this.loading = true;
    this.profileService.editProfile(this.profile).subscribe(
      (res) => {
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.error = error;
        this.loading = false;
      }
    );
  }
}

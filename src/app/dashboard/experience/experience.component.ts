import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from './../../_services/profile.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Experience } from './../../_models/experience';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
  experienceForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  experience: Partial<Experience> = {};
  userId: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private profileService: ProfileService
  ) {
    this.experienceForm = this.formBuilder.group({
      company: ['', Validators.required],
      title: ['', Validators.required],
      location: ['', Validators.required],
      from: ['', Validators.required],
      to: [''],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {}

  get f() {
    return this.experienceForm.controls;
  }

  onSubmit() {
    this.experience = this.experienceForm.value;
    this.submitted = true;
    // console.log(this.education);
    if (this.experienceForm.invalid) {
      return;
    }
    this.loading = true;
    this.profileService.addExperience(this.experience).subscribe(
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

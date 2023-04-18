import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from './../../_services/profile.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Education } from './../../_models/education';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eductaion',
  templateUrl: './eductaion.component.html',
  styleUrls: ['./eductaion.component.scss'],
})
export class EductaionComponent implements OnInit {
  educationForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  education: Partial<Education> = {};
  userId: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((res) => (this.userId = res['id']));
    this.educationForm = this.formBuilder.group({
      school: ['', Validators.required],
      degree: ['', Validators.required],
      fieldofstudy: ['', Validators.required],
      from: ['', Validators.required],
      to: [''],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {}

  get f() {
    return this.educationForm.controls;
  }

  onSubmit() {
    this.education = this.educationForm.value;
    this.submitted = true;
    // console.log(this.education);
    if (this.educationForm.invalid) {
      return;
    }
    this.loading = true;
    this.profileService.addEducation(this.education).subscribe((res) => {
      this.router.navigate(['/dashboard']);
    });
  }
}

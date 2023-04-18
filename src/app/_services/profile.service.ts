import { Experience } from './../_models/experience';
import { Observable } from 'rxjs';
import { Education } from './../_models/education';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  httpOptions = {
    headers: new HttpHeaders({ 'Application-Type': 'text/json' }),
  };

  constructor(private http: HttpClient) {}

  getAllProfiles() {
    return this.http.get(`${environment.apiUrl}/profile/all`);
  }

  getCurrentUserProfile() {
    return this.http.get(`${environment.apiUrl}/profile/`);
  }

  getProfileById(user_id: string) {
    return this.http.get(`${environment.apiUrl}/profile/${user_id}`);
  }

  editProfile(profile: any) {
    return this.http.post(
      `${environment.apiUrl}/profile/`,
      profile,
      this.httpOptions
    );
  }

  addExperience(experience: Partial<Experience>): Observable<Experience> {
    return this.http.post<Experience>(
      `${environment.apiUrl}/profile/experience`,
      experience,
      this.httpOptions
    );
  }

  addEducation(education: Partial<Education>): Observable<Education> {
    return this.http.post<Education>(
      `${environment.apiUrl}/profile/education`,
      education,
      this.httpOptions
    );
  }

  deleteEdu(edu_id: string) {
    return this.http.delete(
      `${environment.apiUrl}/profile/education/${edu_id}`,
      this.httpOptions
    );
  }

  deleteExp(exp_id: string) {
    return this.http.delete(
      `${environment.apiUrl}/profile/experience/${exp_id}`,
      this.httpOptions
    );
  }

  deleteProfile() {
    return this.http.delete(`${environment.apiUrl}/profile/`);
  }
}

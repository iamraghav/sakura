import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({ 'Application-Type': 'text/json' }),
  };

  getCurrentUser() {
    return this.http.get<User>(`${environment.apiUrl}/users/current`);
  }

  register(user: Partial<User>) {
    return this.http.post(
      `${environment.apiUrl}/users/register`,
      user,
      this.httpOptions
    );
  }
}

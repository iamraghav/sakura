import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Application-Type': 'text/json' }),
  };

  getAllPosts(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/posts`);
  }

  postMessage(data: IPost): Observable<IPost> {
    console.log('inside service', data);
    return this.http.post<IPost>(
      `${environment.apiUrl}/posts`,
      data,
      this.httpOptions
    );
  }

  postLike(id): Observable<IPost> {
    return this.http.post<IPost>(
      `${environment.apiUrl}/posts/like/${id}`,
      {},
      this.httpOptions
    );
  }

  postdislike(id): Observable<IPost> {
    return this.http.post<IPost>(
      `${environment.apiUrl}/posts/unlike/${id}`,
      {},
      this.httpOptions
    );
  }
}

export interface IPost {
  text: string;
  name: string;
  userid: string;
  avatar: string;
  username: string;
}

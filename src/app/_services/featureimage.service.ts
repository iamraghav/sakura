import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeatureimageService {
  apiURL: string = `${environment.apiUrl}/posts`;
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders(),
  };

  upload_image(file: File, id: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('imageTitle', file.name);

    return this.http.post(`${this.apiURL}/${id}`, formData, {
      ...this.httpOptions,
      reportProgress: true,
    });
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {
  SERVER_HOST = 'http://localhost:3000';
  constructor(public http: HttpClient) {

  }
  addComment(data) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const ep = this.prepEndpoint('/addComments');
    return this.http.post(ep, data, { headers: headers });
  }
  deleteComment(id) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const ep = this.prepEndpoint('/deleteComment');
    return this.http.post(ep, { cid: id}, { headers: headers });
  }

  getComments() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const ep = this.prepEndpoint('/fetchAllComment');
    return this.http.get(ep, { headers: headers });
  }

  prepEndpoint(ep) {
    return this.SERVER_HOST + ep;
  }

}

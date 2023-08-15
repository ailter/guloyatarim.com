import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  apiUrl: string = 'https://guloya.herokuapp.com/message';
  constructor(private http: HttpClient) { }

  async send(content: string, name: string, email: string) {

    let message = {
      message: {
        name, content, email
      }
    };

    let promise = await this.http.post<any>(this.apiUrl, message).toPromise();
    let response = await Promise.resolve(promise);

    return response;
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class EmailService {
  BASE_URL = "http://localhost:3000/email/";

  constructor(private http: HttpClient) {}

  sendContactEmail(email: any) {
    return this.http.post(this.BASE_URL + "send", email);
  }
}

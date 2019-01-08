import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class EmailService {
  BASE_URL = environment.apiURL + "email";

  constructor(private http: HttpClient) {}

  sendContactEmail(email: any) {
    return this.http.post(this.BASE_URL + "send", email);
  }
}

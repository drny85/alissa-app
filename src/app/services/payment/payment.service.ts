import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tokenKey } from "@angular/core/src/view";

@Injectable({
  providedIn: "root"
})
export class PaymentService {
  BASE_URL = "http://localhost:3000/";
  constructor(private http: HttpClient) {}

  processPayment(token: string, amount: number) {
    return this.http.post<{ token: string; amount: number }>(
      this.BASE_URL + "charge",
      {
        token: token,
        amount: amount
      }
    );
  }
}

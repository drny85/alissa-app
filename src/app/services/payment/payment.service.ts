import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tokenKey } from "@angular/core/src/view";
import { Cart } from "../../models/cart.model";
import { Customer } from "../../models/customer";
import { environment } from "../../../environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class PaymentService {
  BASE_URL = environment.apiURL;

  constructor(private http: HttpClient) {}

  processPayment(
    token: string,
    amount: number,
    cart: Cart,
    customer: Customer
  ) {
    return this.http.post<{
      token: string;
      amount: number;
      cartId: string;
      status?: string;
    }>("charge", {
      token: token,
      amount: amount,
      cart: cart,
      customer: customer
    });
  }
}

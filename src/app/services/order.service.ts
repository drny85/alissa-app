import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  BASE_URL = "http://localhost:3000/order/";
  constructor() {}
}

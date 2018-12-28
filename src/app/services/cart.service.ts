import { Injectable } from "@angular/core";
import { Cart } from "../models/cart.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CartService {
  cart: Cart;
  baseURL = "http://localhost:3000/cart";

  constructor(private http: HttpClient) {}

  createCart() {
    return this.http.get<Cart>(this.baseURL);
  }

  getCartById() {
    let cartId = localStorage.getItem("cartId");
    if (cartId) return this.http.get<Cart>(this.baseURL + "/" + cartId);
  }

  addToCart(cart: Cart) {
    return this.http.post(this.baseURL + "/add", cart);
  }
}

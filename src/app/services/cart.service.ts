import { Injectable } from "@angular/core";
import { Cart } from "../models/cart.model";
import { HttpClient } from "@angular/common/http";
import { Program } from "../models/program.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CartService {
  baseURL = "http://localhost:3000/cart";
  cartId: string;

  constructor(private http: HttpClient) {}

  createCart() {
    return this.http.post<Cart>(this.baseURL + "/create", {});
  }
  get getCardId() {
    let cartId = localStorage.getItem("cartId");
    if (cartId) return cartId;
  }

  getCartById() {
    let cartId = localStorage.getItem("cartId");
    this.cartId = cartId;
    if (cartId)
      return this.http.get<Cart>(this.baseURL + "/" + cartId).pipe(
        map(cart => {
          console.log("CART", cart);
          return {
            programs: cart.programs,
            totalPrice: cart.totalPrice,
            quantity: cart.quantity,
            message: cart.message,
            totalItem: cart.totalItem
          };
        })
      );
  }

  addToCart(program: Program) {
    console.log("Service");
    return this.http.post<Cart>(
      this.baseURL + "/add/" + this.getCardId,
      program
    );
  }
}

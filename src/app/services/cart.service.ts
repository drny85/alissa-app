import { Injectable } from "@angular/core";
import { Cart } from "../models/cart.model";
import { HttpClient } from "@angular/common/http";
import { Program } from "../models/program.model";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CartService {
  baseURL = "http://localhost:3000/cart";
  cartId: string;

  cart = new Subject<Cart>();

  constructor(private http: HttpClient) {}

  createCart() {
    return this.http.post<any>(this.baseURL + "/create", {});
  }
  private get getCardId() {
    let cartId = localStorage.getItem("cartId");
    if (cartId) return cartId;
  }

  getCartById() {
    let cartId = localStorage.getItem("cartId");
    this.cartId = cartId;
    if (cartId) {
      return this.http.get<Cart>(this.baseURL + "/" + cartId);
    }
  }

  populateCart() {
    this.getCartById().subscribe(cart => {
      this.cart.next(cart);
    });
  }

  getCurrentCart() {
    return this.cart.asObservable();
  }

  addToCart(program: Program) {
    this.http
      .post<Cart>(this.baseURL + "/add/" + this.getCardId, program)
      .subscribe(cart => {
        this.cart.next(cart);
      });
  }

  deleteFromCart(program: Program) {
    this.http
      .put<Cart>(this.baseURL + "/update/" + this.getCardId, program)
      .subscribe(cart => {
        this.cart.next(cart);
      });
  }
}
